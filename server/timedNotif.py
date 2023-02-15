import mysql.connector
import json

def addTimed(data):
    groupID = data["groupID"]
    unixTime = data["unixTime"]
    messageBody = data["messageBody"]



    # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f"SELECT data FROM `groups` WHERE `groupID` = '{ groupID }'"

    # Execute the query
    cursor.execute(query)

    # Fetch the results
    results = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    cnx.close()


    
    if len(results[0][0]) == 0:
        agh1 = []
        agh1.append([unixTime, messageBody])
        return commitNew(groupID, json.dumps(agh1))
    else:

        agh = json.loads(results[0][0])
        agh.append([unixTime, messageBody])
        return commitNew(groupID, json.dumps(agh))

    
    

    

    



def commitNew(ID, newData):
     # Connect to the database
    cnx = mysql.connector.connect(user='admin',
                                  password='Password',
                                  host='twinedb.ch3d33yazhdx.us-west-2.rds.amazonaws.com',
                                  database='Twine_Users')

    # Create a cursor object
    cursor = cnx.cursor()

    # Define the query
    query = f'''UPDATE `groups` SET `data` = '{ newData }' WHERE groupID = "{ ID }"'''

    print(query)

    # Execute the query
    cursor.execute(query)

    

    # Close the cursor and connection
    cnx.commit()
    cursor.close()
    cnx.close()

    return {"Verdict": "success"}



