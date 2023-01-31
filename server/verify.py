import twiliosend
import random
import mysql.connector
import json

def verify(data):
    theCode = random.randint(100000, 999999)

    twiliosend.sendTextVerify(data["phoneNumber"], theCode)

    return {
        "verdict": "success",
        "theCode": theCode
    }


def markVerified(data):
    phoneNum = data["phoneNumber"]
    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')
    # Create a cursor object
    cursor = cnx.cursor()


    dataSql = json.dumps({"phoneVerified": "yes"})

    # Insert data into the users table
    query = f"UPDATE users SET data = '{ dataSql }' WHERE phoneNumber = {phoneNum};"
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    return {
        "verdict": "success",
        "userData": dataSql
        }