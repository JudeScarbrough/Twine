import mysql.connector
import json


def hash(pw):
    import hashlib


    password = pw.encode("utf-8")

    # Create a new sha256 hash object
    hash_object = hashlib.sha256()

    # Update the hash object with the bytes of the password
    hash_object.update(password)

    # Get the hexadecimal representation of the hash
    hex_dig = hash_object.hexdigest()

    return hex_dig



def checkNum(phoneNum):
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

    if len(results) > 0:
        return "failed"
    else:
        return "success"

    
def submitUser(data):



    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')
    # Create a cursor object
    cursor = cnx.cursor()

    dataSql = json.dumps({"phoneVerified": "no"})

    # Insert data into the users table
    query = f"INSERT INTO `users` (`phoneNumber`, `fullName`, `hashedPW`, `data`) VALUES ('{ data['phoneNumber'] }','{ data['fullName'] }','{ hash(data['password']) }', '{ dataSql }')"
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    return "success"


def login(data):
    
    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')


    # Create a cursor object
    cursor1 = cnx.cursor()

    phony = data["phoneNumber"]

    # Define the query
    query = f"SELECT * FROM users WHERE phoneNumber = '{phony}';"

    # Execute the query
    cursor1.execute(query)

    # Fetch the results
    results1 = cursor1.fetchall()

    # Close the cursor and connection
    cursor1.close()

    if len(results1) == 0:
        returnStmt = {"error": "nouser"}
        return returnStmt
    else:
        return alreadyUser(data)







   

def alreadyUser(data):
    hashedPW = hash(data["password"])
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')
    # Create a cursor object
    cursor = cnx.cursor()

    phony = data["phoneNumber"]

    # Define the query
    query = f"SELECT * FROM users WHERE phoneNumber = '{phony}' AND hashedPW = '{hashedPW}';"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    if len(results) == 0:
        returnStmt = {"error": "wrongPW"}
        return returnStmt

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    print("made it to bottom")

    returnData = {
        "main": results[0]
    }

    return returnData

