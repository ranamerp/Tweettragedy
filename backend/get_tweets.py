# Libraries
import multiprocessing
from datetime import time

import tweepy as tw
import json
from pymongo import MongoClient
import pandas as pd
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
import nltk
from nltk.corpus import stopwords
from sklearn.linear_model import LogisticRegression, RidgeClassifier, RidgeClassifierCV, Perceptron, SGDClassifier, \
    PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score
nltk.download('stopwords')

# Use this line of code to load back the model
from joblib import load
# Model has a 95% percent accuracy
Relevance_model = load('filename.joblib')
# Parser. This is also a pickle object
parser = load('filename2.joblib')

CONSUMER_KEY = "RUwp5Jv7MLdw5GoorbhKRuBlI"
CONSUMER_SECRET = "fsyrhyubNZfXhczDciIk048fncmA7rcHD7phP4dPrwXfWWlcI0"
ACCESS_TOKEN = "1283827551283093504-q7KZDnxPHV3kmk1UJgSINsncIx05Qf"
ACCESS_TOKEN_SECRET = "34vLn1Ivv3qYUACnPY15sOgUmoCvtPKcjs8EFAxYoSgED"

auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

auth2 = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth2.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

# Link to Simon's database in mongodb atlas
MONGO_HOST = 'mongodb+srv://SimonMarkus:#TheTwitterHackers@cluster0.enna3.mongodb.net/tweetDB?retryWrites=true&w=majority'

def get_past_tweets(keyword):
    search_words = keyword + " -filter:retweets" + " -filter:replies"
    date_since = "2019-01-01"

    api = tw.API(auth, wait_on_rate_limit=True)

    tweets = tw.Cursor(api.search, q=search_words, lang="en", since=date_since).items(10)

    client = MongoClient(MONGO_HOST)
    db = client.twitterdb

    for tweet in tweets:
        pass
        tweet._json['relevance'] = Relevance_model.predict(parser.transform([tweet._json['text']]))[0]
        #db.tweetDB.insert_one(tweet._json)

class StreamListener(tw.StreamListener):
    # This is a class provided by tweepy to access the Twitter Streaming API.

    def on_connect(self):
        # Called initially to connect to the Streaming API
        print("You are now connected to the streaming API.")
        print("Storing tweets in database......")

    def on_error(self, status_code):
        # On error - if an error occurs, display the error / status code
        print('An Error has occured: ' + repr(status_code))
        return False

    def on_data(self, data):
        # This is the meat of the script...it connects to your mongoDB and stores the tweet

        client = MongoClient(MONGO_HOST)

        # Use twitterdb database. If it doesn't exist, it will be created.
        db = client.twitterdb

        # Decode the JSON from Twitter
        datajson = json.loads(data)

        # insert the data into the mongoDB into a collection called tweets
        # if twitter_search doesn't exist, it will be created.
        # Conditional check to prevent retweets or replies to be added to the database
        try:
          if (datajson['text'].find('RT ') == -1 and datajson['text'][0] != '@'):
              datajson['relevance'] = Relevance_model.predict(parser.transform([datajson['text']]))[0]
              print("Streamed Tweet")
              db.tweets.insert_one(datajson)
        except KeyError:
          pass

# Set up the listener. The 'wait_on_rate_limit=True' is needed to help with Twitter API rate limiting.
keyword = input("Enter keyword: ")
start_time = time.time()
listener = StreamListener(api=tw.API(wait_on_rate_limit=True, wait_on_rate_limit_notify=True))
streamer = tw.Stream(auth=auth2, listener=listener)

t1 = multiprocessing.Process(target=get_past_tweets, args=[keyword])
t2 = multiprocessing.Process(target=streamer.filter(track=keyword, languages=['en'], async=True))
t1.start()
t2.start()

t1.join()
t2.join()

streamer.disconnect()
print("Done!")
print("--- This took %s seconds ---" % (time.time() - start_time))
