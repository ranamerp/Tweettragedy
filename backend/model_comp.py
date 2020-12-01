import sys
import csv
import pandas as pd
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
import nltk
from nltk.corpus import stopwords
from sklearn import svm
# from sklearn.linear_model import *
from sklearn.metrics import accuracy_score
import pickle
nltk.download('stopwords')

def text_preprocess(text):
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = [word for word in text.split() if word.lower() not in stopwords.words('english')]
    return " ".join(text)

#loading csv data into dataframe
tweet_data = pd.read_csv(sys.argv[1], encoding="latin")
#dropping rows that may have been left empty
# tweet_data.dropna(axis=0, inplace=True)
#shuffling data
tweet_data = tweet_data.sample(frac=1)

# Copying tweet column from dataset
tweet_data_copy = tweet_data['tweet'].copy()
tweet_data_copy = tweet_data_copy.apply(text_preprocess)

# Collecting each word and its frequency in each tweet
vectorizer = TfidfVectorizer("english")
# vectorizer.transform('test')
# print(type(vectorizer))
tweet_mat = vectorizer.fit_transform(tweet_data_copy)
# print(type(tweet_mat))
pickle.dump(tweet_mat, open('parser.sav', 'wb'))

# Splitting into training and testing models
tweet_train, tweet_test, relevant_norelevant_train, relevant_norelevant_test = \
    train_test_split(tweet_mat, tweet_data['relevance'], test_size=0.33, random_state=100)

#creating svm model and fitting data
svm_model = svm.SVC()
svm_model.fit(tweet_train, relevant_norelevant_train)

#saving model to pickle file
pickle.dump(svm_model, open('svm_model.sav', 'wb'))


print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, svm_model.predict(tweet_test))))

# Comparing models
# LogisticRegression_model = LogisticRegression(solver='liblinear', penalty='l1')
# LogisticRegression_model.fit(tweet_train, relevant_norelevant_train)
# pickle.dump(LogisticRegression_model, open('logisticregression.sav', 'wb'))

# RidgeClassifier_model = RidgeClassifier(solver='sparse_cg', copy_X=True)
# RidgeClassifier_model.fit(tweet_train, relevant_norelevant_train)
# pickle.dump(RidgeClassifier_model, open('ridgeclassifier.sav', 'wb'))

# RidgeClassifierCV_model = RidgeClassifierCV()
# RidgeClassifierCV_model.fit(tweet_train, relevant_norelevant_train)
# pickle.dump(RidgeClassifierCV_model, open('ridgeclassifiercv.sav', 'wb'))


# Perceptron_model = Perceptron(shuffle=True, penalty='l1')
# Perceptron_model.fit(tweet_train, relevant_norelevant_train)
# pickle.dump(Perceptron_model, open('perceptron.sav', 'wb'))

# SGDClassifier_model = SGDClassifier()
# SGDClassifier_model.fit(tweet_train, relevant_norelevant_train)
# pickle.dump(SGDClassifier_model, open('sgdclassifier.sav', 'wb'))

# PassiveAggressive_model = PassiveAggressiveClassifier()
# PassiveAggressive_model.fit(tweet_train, relevant_norelevant_train)
# pickle.dump(PassiveAggressive_model, open('passiveagressive.sav', 'wb'))


# print('LogisticRegression' + '-'*20)
# print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, LogisticRegression_model.predict(tweet_test))))

# print('RidgeClassifier' +'-'*20)
# print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, RidgeClassifier_model.predict(tweet_test))))

# print('RidgeClassifierCV' +'-'*20)
# print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, RidgeClassifierCV_model.predict(tweet_test))))

# print('Perceptron' + '-'*20)
# print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, Perceptron_model.predict(tweet_test))))

# print('SGDClassifier' + '-'*20)
# print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, SGDClassifier_model.predict(tweet_test))))

# print('PassiveAgressiveClassifier' + '-'*20)
# print('Accuracy testing: ' + str(accuracy_score(relevant_norelevant_test, PassiveAggressive_model.predict(tweet_test))))
