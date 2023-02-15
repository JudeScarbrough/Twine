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



def createGroup(data):
    phoneNum = data["phoneNumber"]
    orgName = getOrgName(phoneNum)[0]
    orgID = getOrgName(phoneNum)[1]
    groupName = data["groupName"]
    desc = data["groupDesc"]

    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')
    # Create a cursor object
    cursor = cnx.cursor()

    # Insert data into the users table
    query = f"INSERT INTO `groups`(`groupName`, `groupDescription`, `organizationName`, `organizationID`) VALUES ('{ groupName }','{ desc }','{ orgName }','{ orgID }')"
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f"SELECT `groupID` FROM `groups` WHERE `data` = '' AND `organizationName` = '{ orgName }' AND `groupDescription` = '{ desc }' AND `groupName` = '{ groupName }'"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    

    

    


def getOrgName(phoneNum):
    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f"SELECT * FROM `organizations` WHERE `phoneOwner` = '{ phoneNum }'"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    

    

    agh = [results[0][1], results[0][0]]
    return agh


