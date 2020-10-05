# DISCLAIMER: I have not yet been able to analyze the tweets pulled from
# twitter, as they are in real time and in order to create a table out
# of the tweets, I would have to stop the streaming API from pulling
# any new tweets.

# Still would like to create dataframe out of tweets and display pandas profiling

# I will also research more about the mongodb database, but I think I got most of it.

from __future__ import print_function
from time import sleep
import tweepy
import json
from pymongo import MongoClient

# This is assuming you have mongoDB installed locally
MONGO_HOST = 'mongodb://localhost/twitterdb'
# and a database called twitterdb

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

            # grab the 'created_at' data from the Tweet to use for display
            #created_at = datajson['created_at']

            # print out a message to the screen that we have collected a tweet
            # print("Tweet collected at " + str(created_at))

            # insert the data into the mongoDB into a collection called twitter_search
            # if twitter_search doesn't exist, it will be created.
            print('User: @' + datajson['user']['screen_name'])
            print('"' + datajson['text'] + '"')
            print(datajson['user']['location'])
            print('-----------------------------------------------------------')
            db.twitter_search.insert_one(datajson)
        except Exception as e:
            print(e)


auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
# Set up the listener. The 'wait_on_rate_limit=True' is needed to help with Twitter API rate limiting.
listener = StreamListener(api=tweepy.API(wait_on_rate_limit=True))
streamer = tweepy.Stream(auth=auth, listener=listener)
print("Tracking: " + str(WORDS))
sleep(1)
print('.')
sleep(1)
print('.')
sleep(1)
print('.')
sleep(1)
streamer.filter(track=WORDS)
