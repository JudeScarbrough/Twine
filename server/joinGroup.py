import mysql.connector
import json

def main(data):
    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')

    # Create a cursor object
    cursor = cnx.cursor()

    gn = data["groupID"]


    # Define the query
    query = f"SELECT * FROM `groups` WHERE groupID = '{ gn }';"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    if len(results) > 0:
        return addList1(data, gn)
    else:
        return {
            "verdict": "groupdoesnotexist"
        }





def addList1(data, groupid):
    print(groupid)
    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')

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

    

    if len(str(results)) > 7:
        
        list = json.loads(results[0][0])
        for i in list:
            if i == groupid:
                return {"verdict": "Already Joined"}
        list.append(groupid)
    else:
        list = []
        list.append(groupid)

    

    

    return addList(data, list)


def addList(data, list):
    print(list)
    # Connect to the database
    cnx = mysql.connector.connect(user='judescarbrough',
                                  password='Super2005',
                                  host='mysql.twinenotifications.com',
                                  database='twinedb')
    # Create a cursor object
    cursor = cnx.cursor()

    phoneNum = data["phoneNumber"]

    # Insert data into the users table
    query = f"UPDATE users SET groupIds = '{ json.dumps(list) }' WHERE phoneNumber = '{ phoneNum }';"
    cursor.execute(query)

    # Commit the changes to the database
    cnx.commit()

    # Close the cursor and connection
    cursor.close()
    cnx.close()

    return {"verdict": "success"}


