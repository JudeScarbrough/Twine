import mysql.connector


# mint
def changeName(data):
    groupID = data["groupID"]
    newName = data["newName"]

    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')
    # Create a cursor object
    cursor = cnx.cursor()

    # Insert data into the users table
    query = f'UPDATE `groups` SET groupName = "{ newName }" WHERE groupID = { groupID };'
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    return {"Verdict": "success"}


def changeDesc(data):
    groupID = data["groupID"]
    newDesc = data["newDesc"]

    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')
    # Create a cursor object
    cursor = cnx.cursor()

    # Insert data into the users table
    query = f'UPDATE `groups` SET groupDescription = "{ newDesc }" WHERE groupID = { groupID };'
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    returnSTMT = {"Verdict": "success"}

    return returnSTMT


