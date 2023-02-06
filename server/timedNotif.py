import mysql.connector
import json

def addTimed(data):
    groupID = data["groupID"]
    unixTime = data["unixTime"]
    messageBody = data["messageBody"]



    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f"SELECT data FROM `groups` WHERE `groupID` = '{ groupID }'"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    agh = json.loads(results[0][0])

    agh[unixTime] = messageBody



def commitNew(ID, newData):
     # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f"UPDATE `groups` set `data` = { newData } WHERE `groupID` = '{ groupID }'"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cnx.commit()
    cursor.close()
    cnx.close()



print(addTimed({
    "groupID": "1",
    "unixTime": "12345",
    "messageBody": "blah"
}))