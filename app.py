#Flask Imports
from flask import Flask, request, jsonify, json
from flask_cors import CORS, cross_origin

#Api/Database Imports
import pymongo
import tweepy as tw
import pickle

#Machine Learning Imports
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import *

#General Imports
import string
import time
import multiprocessing
import os

app = Flask(__name__)
CORS(app, support_credentials=True)

parser = pickle.load(open('parser.sav', 'rb'))

CONSUMER_KEY = "RUwp5Jv7MLdw5GoorbhKRuBlI"
CONSUMER_SECRET = "fsyrhyubNZfXhczDciIk048fncmA7rcHD7phP4dPrwXfWWlcI0"
ACCESS_TOKEN = "1283827551283093504-q7KZDnxPHV3kmk1UJgSINsncIx05Qf"
ACCESS_TOKEN_SECRET = "34vLn1Ivv3qYUACnPY15sOgUmoCvtPKcjs8EFAxYoSgED"

auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

auth2 = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth2.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

client = pymongo.MongoClient("mongodb+srv://Application:Hacker@cluster0.qpng4.mongodb.net/tweetsDB?retryWrites=true&w=majority")
db = client["twitterdb"]
col = db["tweets"] 

@app.route("/", methods=['GET'])
def index():
    print("testing if this shows up in console")
    return "<h1>Welcome to our server !!</h1>"

def request_tweets(disaster):
    print(disaster)

@app.route('/refresh_data', methods=['GET', 'POST'])
def refresh_data():
    disaster = request.get_json()
    request_tweets(disaster)
    x = 0
    array_of_json_objects = []
    our_mongo_database_compressed = col.find({},{'created_at':1, 'user.location':1,'_id':0}) 

    for datas in our_mongo_database_compressed: 
        array_of_json_objects.append(datas)

    print("This is our array:", array_of_json_objects)
    our_json_string = json.dumps(array_of_json_objects) #this turns the array of json objects into a json string which can be transfered between db and website
    
    return our_json_string


def model_prediction(text):
    true = 0
    false = 0
    for item in os.listdir("models/"):
        model = pickle.load(open("models/{}".format(item), 'rb'))
        prediction = model.predict(parser.transform([text]))[0]
        if prediction == "T":
            true += 1
        else:
            false += 1
    
    return true > false

#this one might need a route
def get_filtered_tweets(disaster):
    item_list = []
    for item in db.tweets.find({"disaster": disaster}):
        item_list.append(item)
    
    filtered_list = json.dumps(item_list)
    return filtered_list

def get_past_tweets(keyword):
    search_words = keyword + " -filter:retweets" + " -filter:replies"
    date_since = "2019-01-01"
    #until = "2020-11-01"

    api = tw.API(auth, wait_on_rate_limit=False, wait_on_rate_limit_notify=True)
    
    tweets = tw.Cursor(api.search,
                           q=search_words,
                           lang="en",
                           since=date_since).items(1000)

    #see if we can get 1000 every month
    try:
        for tweet in tweets:
            if model_prediction(tweet._json['text']):
                tweet._json['disaster'] = keyword
                db.tweets.insert_one(tweet._json)

    except tw.error.TweepError:
        print("API Issue! Shutting down the connection...")
        exit(0)


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

        #client = MongoClient(MONGO_HOST)

        # Use twitterdb database. If it doesn't exist, it will be created.
        #db = client.twitterdb

        # Decode the JSON from Twitter
        datajson = json.loads(data)

        # insert the data into the mongoDB into a collection called tweets
        # if twitter_search doesn't exist, it will be created.
        # Conditional check to prevent retweets or replies to be added to the database
        try:
          if (datajson['text'].find('RT ') == -1 and datajson['text'][0] != '@'):
            if model_prediction(datajson['text']):
                datajson['disaster'] = keyword
                db.tweets.insert_one(datajson)

        except KeyError:
          pass

def get_tweets(keyword):
    start_time = time.time()
    listener = StreamListener(api=tw.API(wait_on_rate_limit=False, wait_on_rate_limit_notify=True))
    streamer = tw.Stream(auth=auth2, listener=listener)

    t1 = multiprocessing.Process(target=get_past_tweets, args=[keyword]) 
    t2 = multiprocessing.Process(target=streamer.filter(track=keyword, languages=['en'], is_async=True))
    t1.start() 
    t2.start()

    t1.join()
    t2.join()

    streamer.disconnect()
    print("Done!") 
    print("--- This took %s seconds ---" % (time.time() - start_time))    
