import sqlExecute
import mysql.connector
import json
import random

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
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')
    # Create a cursor object
    cursor = cnx.cursor()

    dataSql = json.dumps({"phoneVerified": "no"})

    # Insert data into the users table
    query = f"INSERT INTO `reset` (`phoneNumber`, `code`) VALUES ('{ data['phoneNumber'] }','{ random.randint(100000, 999999) }')"
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    return {"verdict": "success"}
    
    

