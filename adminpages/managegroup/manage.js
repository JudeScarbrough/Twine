activeID = ""
allGroupData = []
groupIndex = ""

currentGroupDataJSON = []

if(localStorage.getItem("userData") == "null"){
    window.location.href="../login/loginui.html"
}
if(JSON.parse(localStorage.getItem("userData"))["phoneVerified"] == "no"){
    window.location.href="../verify/verify.html"
}

function signOutFunc(){
    localStorage.setItem("userData", null)
    localStorage.setItem("name", null)
    localStorage.setItem("phoneNumber", null)
    localStorage.setItem("groupIds", null)

    window.location.href = "../../index.html"
}

data = {
    "intention": "manageGroups",
    "phoneNumber": localStorage.getItem("phoneNumber")
}

function updateData(){

fetch('http://127.0.0.1:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.text())
                .then(data => {
                    
                    htString = '<h1 id="gtitle">Groups</h1><hr>'
    
                    dataObj = JSON.parse(data)
                    allGroupData = dataObj
                    
                    
                    for (let i = 0; i < dataObj.length; i++) {
                        htString = htString + '<div class="section" id="section' + dataObj[i][0] + '"><h3 onclick="groupClicked(' + dataObj[i][0] + ')">' + dataObj[i][1] + '</h3><hr></div>'
                    }
                    document.getElementById("innervert").innerHTML = htString
                    resetList()

                });
    
            }

updateData()

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("name").innerHTML = localStorage.getItem("name")
    document.getElementById("number").innerHTML = localStorage.getItem("phoneNumber")
    document.getElementById("bottomsection").style.display = "none"

    document.getElementById("reptitle").innerHTML = "Select a Group"

    document.getElementById("repdesc").innerHTML = ""
});



function groupClicked(i){
    updateData()
    
    document.getElementById("bottomsection").style.display = "flex"

    for (let x = 0; x < allGroupData.length; x++) {
        if (allGroupData[x][0] == i){
            groupIndex = x
        }
    }

    allVertList = document.getElementsByClassName("section")

    for (let x = 0; x < allVertList.length; x++) {
        allVertList[x].style = "color: black;"
    }

    document.getElementById("section" + i).style = "color: #007cc9;"

    document.getElementById("reptitle").innerHTML = '<span>' + allGroupData[groupIndex][1] + '</span><button onclick="titleClick()" class="microedit">Edit</button>'


    document.getElementById("repdesc").innerHTML = '<span>' + allGroupData[groupIndex][2] + '</span><button onclick="descClick()" class="microedit">Edit</button>'
    activeID = i
    if(allGroupData[groupIndex][5] !== ""){
        currentGroupDataJSON = JSON.parse(allGroupData[groupIndex][5])
    }
    
    
    resetList()

}

function resetList(){
    if (activeID == ""){
        document.getElementById("timetable").innerHTML = ""
        return
    } else if (allGroupData[groupIndex][5] == ""){
        document.getElementById("timetable").innerHTML = ""
    } else {
    currentGroupData = JSON.parse(allGroupData[groupIndex][5])
    
    origHTML = '<tr><td><h1 class="tabletitle datebox">Date & Time</h1></td><td><h1 class="tabletitle">Message</h1></td><td></td></tr>'
    sample = ""
    index = 0
    for (key in currentGroupData) {
        
        sample += "<tr class='timerow'><td class='datebox' id='date" + index + "'>" + unixToDateTime(currentGroupData[index][0]) + "</td><td class='msg' id='msg" + index + "'>" + currentGroupData[index][1] + "</td><td id='tr" + index + "' ><button id='msgEdit" + index + "' onclick='editTimed(" + index + ")' class='microedit'>Edit</button></td></tr>"
        index += 1
    }
    document.getElementById("timetable").innerHTML = origHTML + sample
}

}

function titleClick(){
    document.getElementById("reptitle").innerHTML = '<textarea id="titleText" style="height: 25px; width: 300px; vertical-align: middle; font-size: 20px;">' + allGroupData[groupIndex][1] + '</textarea><button onclick="titleSubmit()" class="microedit" style="width: 100px;">Confirm Title</button>'
}

function descClick(){
    document.getElementById("repdesc").innerHTML = '<textarea id="descText" style="height: 75px; width: 300px; vertical-align: middle; font-size: 20px;">' + allGroupData[groupIndex][2] + '</textarea><button onclick="descSubmit()" class="microedit" style="width: 150px;">Confirm Description</button>'
}


function titleSubmit(){
    changed = document.getElementById("titleText").value
    
    titleData = {
        "intention": "changeGroupName",
        "groupID": activeID,
        "newName": changed
    }

    fetch('http://127.0.0.1:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(titleData)
            }).then(response => response.text())
                .then(data => {
                    
    
                    dataObj = JSON.parse(data)
                    

                    if (dataObj["Verdict"] == "success"){
                        document.getElementById("reptitle").innerHTML = '<span>' + changed + '</span><button onclick="titleClick()" class="microedit">Edit</button>'
                    }

                });

    updateData()
    document.getElementById("section" + activeID).style = "color: #007cc9;"
}

function descSubmit(){
    changed = document.getElementById("descText").value
    

    descData = {
        "intention": "changeDesc",
        "groupID": activeID,
        "newDesc": changed
    }

    fetch('http://127.0.0.1:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(descData)
            }).then(response => response.text())
                .then(data => {
                    
    
                    dataObj = JSON.parse(data)
                    
                    if (dataObj["Verdict"] == "success"){
                        document.getElementById("repdesc").innerHTML = '<span>' + changed + '</span><button onclick="descClick()" class="microedit">Edit</button>'

                    }
    

                });
    
    updateData()
    document.getElementById("section" + activeID).style = "color: #007cc9;"
}






function wantsAdd(){
    document.getElementById("addnewtimed").style.display = "block"
    document.getElementById("timedbutt1").style.display = "none"
    document.getElementById("timedmessage").innerHTML = ""
}

function addNotif(){

    validit = true

    dateValue = document.getElementById("timeddate").value
    timeValue = document.getElementById("timedtime").value
    message = document.getElementById("timedmessage").value

    if(dateValue == ""){
        if(timeValue == ""){
            if(message == ""){
                alert("You must fill in all fields.")
                validit = false
            } else {
                alert("You must enter a date and time.")
                validit = false
            }
        } else {
            if(message == ""){
                alert("You must fill in all fields.")
                validit = false
            } else {
                alert("You must enter a valid date.")
                validit = false
            }
        }
    }else{
        if(timeValue == ""){
            if(message == ""){
                alert("You must enter a message and time.")
                validit = false
            } else {
                alert("You must enter a valid time.")
                validit = false
            }
        } else {
            if(message == ""){
                alert("You must enter a message.")
                validit = false
            }
        }
    }



    const date = new Date(`${dateValue}T${timeValue}`);

    // Get the Unix timestamp (number of milliseconds since January 1, 1970, 00:00:00 UTC)
    const timestamp = date.getTime();

    // Convert milliseconds to seconds
    const unixTimestamp = timestamp / 1000;

    

    hmmData = {
        "intention": "createTimed",
        "groupID": activeID,
        "unixTime": unixTimestamp,
        "messageBody": message
    }
    
    if(validit){
    fetch('http://127.0.0.1:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hmmData)
            }).then(response => response.text())
                .then(data => {
                    
    
                    dataObj = JSON.parse(data)
                    
                    if (dataObj["Verdict"] == "success"){
                        document.getElementById("addnewtimed").style.display = "none"
                        document.getElementById("timedbutt1").style.display = "block"
                        updateData()
                        groupClicked(activeID)
                    }
    

                });}
    
    
}



function unixToDateTime(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}
  
  

function editTimed(i){
    document.getElementById("msg" + i).innerHTML = "<textarea id='textarea" + i + "' style='text-align: center; height: 60px;'>" + document.getElementById("msg" + i).innerHTML + "</textarea>"
    document.getElementById("tr" + i).innerHTML = "<button style='width: 60px;' onclick='confirmEdit(" + i + ")' class='microedit'>Confirm</button><a style='color: blue; font-size: 14px; padding-left: 10px; cursor: pointer;' onclick='deleteTime(" + i + ")'>delete</a>"
    document.getElementById("date" + i).innerHTML = document.getElementById("date" + i).innerHTML + "<button onclick='editDate(" + i + ")' style='margin: 0px 0px 0px 0px;' class='microedit'>Edit</button>"
}
let editedDates = []

function confirmEdit(i){
    newMsg = document.getElementById("textarea" + i).value
    currentGroupDataJSON[i][1] = newMsg
    submitGroupData()
    dateIndex = document.getElementById("date" + i).innerHTML.indexOf("<")
    if (document.getElementById("date" + i).innerHTML.length > 120){
        document.getElementById("date" + i).innerHTML = unixToDateTime(currentGroupDataJSON[i][0])
    } else {
        document.getElementById("date" + i).innerHTML = document.getElementById("date" + i).innerHTML.slice(0, dateIndex)
    }
    
    document.getElementById("msg" + i).innerHTML = document.getElementById("textarea" + i).value
    document.getElementById("tr" + i).innerHTML = "<button id='msgEdit" + i + "' onclick='editTimed(" + i + ")' class='microedit'>Edit</button>"
}


function deleteTime(i){
    alert("delete " + i)
}




function cancelNewTimed(){
    document.getElementById("addnewtimed").style.display = "none"
    document.getElementById("timedbutt1").style.display = "block"
    document.getElementById("timedmessage").innerHTML = ""
}


function editDate(i){
    document.getElementById("date" + i).innerHTML = "<input id='datein" + i + "' type='date'><input id='timein" + i + "' type='time'><button onclick='dateConfirm(" + i + ")' style='width: 60px; margin-left: 0px;' class='microedit'>Confirm</button>"
    editedDates.push("date" + i)

}





function dateConfirm(i){
    dateval = document.getElementById("datein" + i).value
    timeval = document.getElementById("timein" + i).value
    const date = new Date(`${dateval}T${timeval}`);

    // Get the Unix timestamp (number of milliseconds since January 1, 1970, 00:00:00 UTC)
    const timestamp = date.getTime();

    // Convert milliseconds to seconds
    const unixTimestamp1 = timestamp / 1000;

    if(unixTimestamp1 > 4){
        //add new time stamp to group data list

        currentGroupDataJSON[i][0] = unixTimestamp1

        document.getElementById("date" + i).innerHTML = unixToDateTime(unixTimestamp1) + "<button onclick='editDate(" + i + ")' style='margin: 0px 0px 0px 0px;' class='microedit'>Edit</button>"
    } else {
        alert("Enter a valid time.")
    }
}

function submitGroupData(){
    fetch('http://127.0.0.1:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"groupID": activeID, "stringData": JSON.stringify(currentGroupDataJSON), "intention": "updateTimed"})
            }).then(response => response.text())
                .then(data => {
                    
    
                    dataObj = JSON.parse(data)
                    
                    if (dataObj["Verdict"] == "success"){
                        console.log("Success")
                    }
    

                });

}



/*
<tr>
                            <td>
                                <h3 class="datetime">October 4th, 2023</h3>
                                <h3 class="datetime">1:27 PM</h3>
                            </td>
                            <td class="messagebody">
                                <p class="messagebody">blahahahahahahahhahahahahahhahahahahahhaha blahahahahahahahhahahahahahhahahahahahhaha blahahahahahahahhahahahahahhahahahahahhaha blahahahahahahahhahahahahahhahahahahahhaha</p>
                            </td>
                            <td>
                                <button class="microedit">Edit</button>
                            </td>
                        </tr>*/


