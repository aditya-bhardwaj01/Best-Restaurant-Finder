from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from zomato_data_analysis import rest_types
from zomato_data_analysis import most_famous_rest_type
from zomato_data_analysis import getLocations

app = Flask(__name__)

CORS(app)

@app.route("/searchResult", methods=['GET', 'POST'])
def showSearchRestTypeResult():
    searchText = request.json["searchText"]
    matchResult = []
    for rest_type in rest_types:
        if searchText.lower() in rest_type.lower():
            matchResult.append(rest_type)
    return matchResult

@app.route("/showRestaurant", methods=['GET', 'POST'])
def showRestaurant():
    restType = request.json["restType"]
    # result = []
    result = most_famous_rest_type(restType)
    data = result.values.tolist()
    json_data = json.dumps(data)
    # send response
    return jsonify(json_data)

@app.route("/searchLocation", methods=['GET', 'POST'])
def showSearchLocationResult():
    searchText = request.json["searchText"]
    print(searchText)
    return getLocations(searchText)
    

if __name__ == "__main__":
    app.run(debug=True)