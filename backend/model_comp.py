# Libraries
import tweepy as tw
import json
import csv
from pymongo import MongoClient
import pandas as pd
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
import nltk
from nltk.corpus import stopwords
from sklearn.linear_model import LogisticRegression
from sklearn.linear_model import *
from sklearn.metrics import accuracy_score
nltk.download('stopwords')

def text_preprocess(text):
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = [word for word in text.split() if word.lower() not in stopwords.words('english')]
    return " ".join(text)

# Importing training dataset
tweet_data = pd.read_csv("training.csv", encoding="latin")
# Dropping index column
tweet_data = tweet_data.drop(['Unnamed: 0'], axis=1)
# Dropping all empty columns that I may have left blank on accident
tweet_data.dropna(axis=0, inplace=True)
# Shuffling rows
tweet_data = tweet_data.sample(frac=1)

# Copies tweet column from dataset
tweet_data_copy = tweet_data['tweet'].copy()
# Removes punctuation and stopwords. Only keeps keywords of all tweets.
tweet_data_copy = tweet_data_copy.apply(text_preprocess)

# Collecting each word and its frequency in each email
vectorizer = TfidfVectorizer("english")
tweet_mat = vectorizer.fit_transform(tweet_data_copy)

# Splitting training model
tweet_train, tweet_test, relevant_norelevant_train, relevant_norelevant_test = \
    train_test_split(tweet_mat, tweet_data['relevance'], test_size=0.3, random_state=100)

# Making machine learning function
LogisticRegression_model = LogisticRegression(solver='liblinear', penalty='l1')
LogisticRegression_model.fit(tweet_train, relevant_norelevant_train)

RidgeClassifier_model = RidgeClassifier(solver='sparse_cg', copy_X=True)
RidgeClassifier_model.fit(tweet_train, relevant_norelevant_train)

RidgeClassifierCV_model = RidgeClassifierCV()
RidgeClassifierCV_model.fit(tweet_train, relevant_norelevant_train)

Perceptron_model = Perceptron(shuffle=True, penalty='l1')
Perceptron_model.fit(tweet_train, relevant_norelevant_train)

SGDClassifier_model = SGDClassifier()
SGDClassifier_model.fit(tweet_train, relevant_norelevant_train)

PassiveAggressive_model = PassiveAggressiveClassifier()
PassiveAggressive_model.fit(tweet_train, relevant_norelevant_train)

print('LogisticRegression' + '-'*20)
print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, LogisticRegression_model.predict(tweet_test))))
print('Accuracy training: ' + str(accuracy_score(relevant_norelevant_train, LogisticRegression_model.predict(tweet_train))))

print('RidgeClassifier' +'-'*20)
print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, RidgeClassifier_model.predict(tweet_test))))
print('Accuracy training: ' + str(accuracy_score(relevant_norelevant_train, RidgeClassifier_model.predict(tweet_train))))

print('RidgeClassifierCV' +'-'*20)
print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, RidgeClassifierCV_model.predict(tweet_test))))
print('Accuracy training: ' + str(accuracy_score(relevant_norelevant_train, RidgeClassifierCV_model.predict(tweet_train))))

print('Perceptron' + '-'*20)
print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, Perceptron_model.predict(tweet_test))))
print('Accuracy training: ' + str(accuracy_score(relevant_norelevant_train, Perceptron_model.predict(tweet_train))))

print('SGDClassifier' + '-'*20)
print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, SGDClassifier_model.predict(tweet_test))))
print('Accuracy training: ' + str(accuracy_score(relevant_norelevant_train, SGDClassifier_model.predict(tweet_train))))

print('PassiveAgressiveClassifier' + '-'*20)
print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, PassiveAggressive_model.predict(tweet_test))))
print('Accuracy training: ' + str(accuracy_score(relevant_norelevant_train, PassiveAggressive_model.predict(tweet_train))))