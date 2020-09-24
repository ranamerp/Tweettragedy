import tweepy as tw  # Library for twitter api
import pandas as pd  # For data analytics
from pandas_profiling import ProfileReport  # Detailed report on tweets(?)
import time
import datetime

# Boring stuff
consumer_key = "Duko8zJpuAMqAqOCGn3gLCdU7"
consumer_secret = "K116dYN4lj0Ol4DGUsiCMAH8Vhz5tL02k3OPERWifGmwDLJ2rm"
access_token = "603210098-mkYuAJoQ5SptpC7laiENIFeyquRwCqPfA2XRTgt0"
access_token_secret = "vMeTce7nJffxEFDOGyNHrCHYIYIARP0IVywjaHPhg6oN8"

auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

# Tweet search begins
search = input("Enter keyword: ")
search_words = search + " -filter:retweets"
date_since = "2020-01-01"  # Irrelevant since we collect most recent tweets
# if keyword is rare and you request a large data pool, you may want to
# consider setting back the date.

print("Getting Tweets.......")
tweets = tw.Cursor(api.search,
                           q=search_words,
                           lang="en",
                           since=date_since).items(1000)  # Number of items we store in our database

print("Saving Tweets to List.......")
print("Please wait (this may take a few minutes).......")
users_locs = [[tweet.user.screen_name, tweet.text, tweet.user.location] for tweet in tweets]


print("Converting Tweets to DataFrame......")
# Creates dataframe
tweet_dataframe = pd.DataFrame(data=users_locs, columns = ["Username", "Tweet", "Location"])

tweet_dataframe.to_csv("tweets.csv")

print(tweet_dataframe.describe())  # stats on collected tweets
print(tweet_dataframe.head())  # Glimpse on tweet dataframe

# THIS REPORT GIVES DETAILED ANALYSIS ON DATAFRAME
prof = ProfileReport(tweet_dataframe)
prof.to_file(output_file='outputAnalytics.html')
