from twilio.rest import Client

account_sid = ''
auth_token = ''

def sendText(phoneNum, code):
    

    message = f"Your Twine reset code is {code}."

    client = Client(account_sid, auth_token) 

    editedNum = "+1" + str(phoneNum)
 
    message = client.messages.create(from_='+17208159342', body=message, to=editedNum) 

def sendTextVerify(phoneNum, code):
    

    message = f"Your Twine verification code is {code}."

    client = Client(account_sid, auth_token) 

    editedNum = "+1" + str(phoneNum)
 
    message = client.messages.create(from_='+17208159342', body=message, to=editedNum) 

