import sqlExecute
import mysql.connector
import json
import random
import twiliosend

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
    query = f"SELECT * FROM `users` WHERE `phoneNumber` = '{ phoneNum }'"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    if len(results) < 0:
        return {"verdict": "nophone"}
    else:
        return continued(data)

def continued(data):
    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')
    # Create a cursor object
    cursor = cnx.cursor()


    theCode = random.randint(100000, 999999)

    # Insert data into the users table
    query = f"INSERT INTO `reset` (`phoneNumber`, `code`) VALUES ('{ data['phoneNumber'] }','{ theCode }')"
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    twiliosend.sendText(data['phoneNumber'], theCode)

    return {"verdict": "success"}
    
    

