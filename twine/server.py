import sqlExecute
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)
CORS(app)


def determine(data):
    if (data["intention"] == "signup"):
        return signup(data)
    if (data["intention"] == "login"):
        return login(data)

    
def login(data):
    return sqlExecute.login(data)

def signup(data):
    returnData = {}
    returnData["phoneTaken"] = sqlExecute.checkNum(data["phoneNumber"])
    if returnData["phoneTaken"] == "success":
        returnData["dataPlaced"] = sqlExecute.submitUser(data)
    return returnData

@app.route('/', methods=['POST'])
def receive_data():
    data = request.get_json()
    print(data)
    return determine(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
