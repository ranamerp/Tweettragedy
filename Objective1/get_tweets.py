import tweepy as tw
import pandas as pd
import time
import datetime

consumer_key = 'Duko8zJpuAMqAqOCGn3gLCdU7'
consumer_secret= 'K116dYN4lj0Ol4DGUsiCMAH8Vhz5tL02k3OPERWifGmwDLJ2rm'
access_token= '603210098-mkYuAJoQ5SptpC7laiENIFeyquRwCqPfA2XRTgt0'
access_token_secret= 'vMeTce7nJffxEFDOGyNHrCHYIYIARP0IVywjaHPhg6oN8'

auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

search = input('Enter a search term: ')
search_words = search + " -filter:retweets"
date_since = "2020-01-01"

print("Getting Tweets")
tweets = tw.Cursor(api.search, 
                           q=search_words,
                           lang="en",
                           since=date_since).items(1000)
print("Saving Tweets to List..")
users_locs = [[tweet.user.screen_name, tweet.text, tweet.user.location] for tweet in tweets]
print("Converting Tweets to DataFrame...")
tweet_text = pd.DataFrame(data=users_locs, 
                    columns=['user', "tweet", "location"])


tweet_text.to_csv("tweets.csv")

