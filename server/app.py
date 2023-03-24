from flask import Flask, request
from flask_cors import CORS
from zomato_data_analysis import rest_types

app = Flask(__name__)

CORS(app)

@app.route("/searchResult", methods=['GET', 'POST'])
def hello():
    searchText = request.json["searchText"]
    matchResult = []
    for rest_type in rest_types:
        if searchText.lower() in rest_type.lower():
            matchResult.append(rest_type)
    return matchResult

if __name__ == "__main__":
    app.run(debug=True)