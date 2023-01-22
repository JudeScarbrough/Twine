import mysql.connector
import json

def main(data):
    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                              password='Password',
                              host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                              database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    gn = data["groupName"]
    on = data["orgName"]

    # Define the query
    query = f"SELECT groupID FROM `groups` WHERE groupName = '{ gn }' AND organizationName = '{ on }';"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    groupid = results[0][0]

    return addList1(data, groupid)





def addList1(data, groupid):
    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                              password='Password',
                              host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                              database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    phoneNum = data["phoneNumber"]

    # Define the query
    query = f"SELECT groupIds FROM `users` WHERE phoneNumber = '{ phoneNum }';"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    list = json.loads(results[0][0])

    for i in list:
        if i == groupid:
            return {"verdict": "Already Joined"}
    
    list.append(groupid)

    return addList(data, list)


def addList(data, list):
    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')
    # Create a cursor object
    cursor = cnx.cursor()

    phoneNum = data["phoneNumber"]

    # Insert data into the users table
    query = f"UPDATE users SET groupIds = '{ list }' WHERE phoneNumber = '{ phoneNum }';"
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    return {"verdict": "success"}



print(addList1({
    "orgName": "Jude",
    "groupName": "When Jude Poops",
    "phoneNumber": "5126623667"
}, 6))