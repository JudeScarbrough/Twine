import mysql.connector
import json
import sqlExecute


def main(data):
    theCode = data["theCode"]
    phoneNum = data["phoneNum"]
    password = data["password"]

    if checkNumForCode(phoneNum, theCode):
        # Connect to the database
        cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')
        # Create a cursor object
        cursor = cnx.cursor()

        dataSql = json.dumps({"phoneVerified": "no"})

        # Insert data into the users table
        query = f"UPDATE users SET hashedPW = '{sqlExecute.hash(password)}' WHERE phoneNumber = {phoneNum};"
        cursor.execute(query)

        # Commit the changes to the database
        cnx.commit()

        # Close the cursor and connection
        cursor.close()
        cnx.close()

        return {"verdict": "success"}




def checkNumForCode(num, code):
    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                              password='Password',
                              host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                              database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f"SELECT * FROM reset WHERE phoneNumber = '{num}' AND code = '{code}';"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    if len(results) > 0:
        return True
    else:
        return False