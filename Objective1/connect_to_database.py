from __future__ import print_function
import tweepy
import json
from pymongo import MongoClient

# Link to Simon's database in mongodb atlas
MONGO_HOST = 'mongodb+srv://markusovich:Alexmom99@cluster0.enna3.mongodb.net/twitterdb?retryWrites=true&w=majority'
# Created a database named "twitterdb" in custer0

keyword = input("Enter keyword: ")
keywordWithPoundSign = "#" + keyword  # Included keyword with pound sign in front, same thing

WORDS = [keyword, keywordWithPoundSign]

CONSUMER_KEY = "Duko8zJpuAMqAqOCGn3gLCdU7"
CONSUMER_SECRET = "K116dYN4lj0Ol4DGUsiCMAH8Vhz5tL02k3OPERWifGmwDLJ2rm"
ACCESS_TOKEN = "603210098-mkYuAJoQ5SptpC7laiENIFeyquRwCqPfA2XRTgt0"
ACCESS_TOKEN_SECRET = "vMeTce7nJffxEFDOGyNHrCHYIYIARP0IVywjaHPhg6oN8"

class StreamListener(tweepy.StreamListener):
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
        try:
            client = MongoClient(MONGO_HOST)

            # Use twitterdb database. If it doesn't exist, it will be created.
            db = client.twitterdb

            # Decode the JSON from Twitter
            datajson = json.loads(data)

            # insert the data into the mongoDB into a collection called tweets
            # if twitter_search doesn't exist, it will be created.
            # Conditional check to prevent retweets or replies to be added to the database
            if (datajson['text'].find('RT ') == -1 and datajson['text'][0] != '@'):
                #db.tweets.insert_one(datajson)
                print(datajson['text'])
        except Exception as e:
            print(e)


auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
# Set up the listener. The 'wait_on_rate_limit=True' is needed to help with Twitter API rate limiting.
listener = StreamListener(api=tweepy.API(wait_on_rate_limit=True))
streamer = tweepy.Stream(auth=auth, listener=listener)
print("Tracking: " + str(WORDS))
streamer.filter(track=WORDS, languages=["en"])
