# developer: John Dale Scarbrough IV
# intent: fundraiser for world domination


import sqlExecute
from flask_cors import CORS
from flask import Flask, request
import reset
import reset2
import verify
import loadDashboard
import joinGroup
import manageGroups
import editGroup
import timedNotif

app = Flask(__name__)
CORS(app)


def determine(data):
    if (data["intention"] == "signup"):
        return signup(data)
    if (data["intention"] == "login"):
        return login(data)
    if (data["intention"] == "reset"):
        return reset.main(data)
    if (data["intention"] == "reset2"):
        return reset2.main(data)
    if (data["intention"] == "verify"):
        return verify.verify(data)
    if (data["intention"] == "markVerified"):
        return verify.markVerified(data)
    if (data["intention"] == "loadDashboard"):
        return loadDashboard.main(data)
    if(data["intention"] == "joinGroup"):
        return joinGroup.main(data)
    if(data["intention"] == "manageGroups"):
        return manageGroups.main(data)
    if(data["intention"] == "changeGroupName"):
        return editGroup.changeName(data)
    if(data["intention"] == "changeDesc"):
        return editGroup.changeDesc(data)
    if(data["intention"] == "createTimed"):
        return timedNotif.addTimed(data)
    if(data["intention"] == "updateTimed"):
        return timedNotif.updateTimed(data)
    if (data["intention"] == "createGroup"):
        return manageGroups.createGroup(data)





    return {"response": "invalid intention"}

    
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
