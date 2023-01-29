import json
import mysql.connector



def main(data):
    groupIds = json.loads(userData(data["phoneNumber"])[0][0])["adminOwner"]

    if len(groupIds) > 0:
        listy = []
        for i in groupIds:
            listy.append(getGroupData(i))
        return listy
    else:
        return


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

def userData(phoneNum):
     # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')


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



