import time
import subprocess
from flask import Flask, request
from flask_cors import CORS, cross_origin
import pymongo

disaster = ""
app = Flask(__name__)
CORS(app, support_credentials=True)

#usr = ""
#pwd = ""
#client = pymongo.MongoClient("mongodb+srv://" + usr + ":" + pwd + "@firstcluster-obuqd.mongodb.net/test?retryWrites=true&w=majority")
#db = client['SampleDatabase']
#collection = db['SampleCollection']

def request_tweets(disaster):
    print(disaster)
    #subprocess.call("./../../../backend/get_tweets", disaster)

@app.route('/refresh_data', methods=['GET', 'POST'])
#@cross_origin(supports_credentials=True)
def refresh_data():
    disaster = request.get_json()
    request_tweets(disaster)
    return {'tweets': 5}