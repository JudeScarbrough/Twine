from twilio.rest import Client


def sendText(phoneNum, code):
    account_sid = ''
    auth_token = ''

    message = f"Your Twine reset code is {code}."

    client = Client(account_sid, auth_token) 

    editedNum = "+1" + str(phoneNum)
 
    message = client.messages.create(from_='+17208159342', body=message, to=editedNum) 


sendText("5126623667", "696969")