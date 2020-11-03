# Libraries
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

# Link to Simon's database in mongodb atlas
MONGO_HOST = 'mongodb+srv://SimonMarkus:#TheTwitterHackers@cluster0.enna3.mongodb.net/tweetDB?retryWrites=true&w=majority'

keyword = input("Enter keyword: ")

CONSUMER_KEY = "RUwp5Jv7MLdw5GoorbhKRuBlI"
CONSUMER_SECRET = "fsyrhyubNZfXhczDciIk048fncmA7rcHD7phP4dPrwXfWWlcI0"
ACCESS_TOKEN = "1283827551283093504-q7KZDnxPHV3kmk1UJgSINsncIx05Qf"
ACCESS_TOKEN_SECRET = "34vLn1Ivv3qYUACnPY15sOgUmoCvtPKcjs8EFAxYoSgED"

auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

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

# Set up the listener. The 'wait_on_rate_limit=True' is needed to help with Twitter API rate limiting.
print("Collecting past tweets...")
get_past_tweets(keyword)
