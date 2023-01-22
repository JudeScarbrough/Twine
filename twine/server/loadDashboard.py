import mysql.connector
import json


def main(data):

    phoneNum = data["phoneNumber"]
    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                              password='Password',
                              host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                              database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f"SELECT `groupIds` FROM `users` WHERE `phoneNumber` = '{ phoneNum }'"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    groupIds = json.loads(results[0][0])

    
    returnList = []

    for i in groupIds:
        returnList.append(getGroupData(i))

    resturnData = {
        "groupData": returnList
    }

    return resturnData


def getGroupData(id):
    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                              password='Password',
                              host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                              database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f"SELECT * FROM `groups` WHERE `groupID` = '{ id }'"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    return results[0]









