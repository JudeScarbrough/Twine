import mysql.connector
import json


def main(data):

    phoneNum = data["phoneNumber"]
    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')

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
        "groupData": returnList,
        "userData": userData(phoneNum)
    }

    return resturnData


def userData(phoneNum):
     # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')


    # Create a cursor object
    cursor1 = cnx.cursor()

    

    # Define the query
    query = f"SELECT data FROM users WHERE phoneNumber = '{ phoneNum }';"

    # Execute the query
    cursor1.execute(query)

    # Fetch the results
    results1 = cursor1.fetchall()

    # Close the cursor and connection
    cursor1.close()

    return results1






def getGroupData(id):
    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')

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









