from flask import Flask, request, jsonify, json
from flask_cors import CORS, cross_origin
import pymongo

disaster = ""
app = Flask(__name__)
CORS(app, support_credentials=True)


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

    our_json_string = json.dumps(array_of_json_objects) #this turns the array of json objects into a json string which can be transfered between db and website
    
    return our_json_string
