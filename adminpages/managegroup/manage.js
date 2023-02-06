activeID = ""
allGroupData = []
groupIndex = ""

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
                    console.log(dataObj)
                    
                    for (let i = 0; i < dataObj.length; i++) {
                        htString = htString + '<div class="section" id="section' + dataObj[i][0] + '"><h3 onclick="groupClicked(' + dataObj[i][0] + ')">' + dataObj[i][1] + '</h3><hr></div>'
                    }
                    document.getElementById("innervert").innerHTML = htString

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
}

function addNotif(){
    dateValue = document.getElementById("timeddate").value
    timeValue = document.getElementById("timedtime").value
    message = document.getElementById("timedmessage").value

    if(dateValue == ""){
        if(timeValue == ""){
            if(message == ""){
                alert("You must fill in all fields.")
            } else {
                alert("You must enter a date and time.")
            }
        } else {
            if(message == ""){
                alert("You must fill in all fields.")
            } else {
                alert("You must enter a valid date.")
            }
        }
    }else{
        if(timeValue == ""){
            if(message == ""){
                alert("You must enter a message and time.")
            } else {
                alert("You must enter a valid time.")
            }
        } else {
            if(message == ""){
                alert("You must enter a message.")
            }
        }
    }



    const date = new Date(`${dateValue}T${timeValue}`);

    // Get the Unix timestamp (number of milliseconds since January 1, 1970, 00:00:00 UTC)
    const timestamp = date.getTime();

    // Convert milliseconds to seconds
    const unixTimestamp = timestamp / 1000;

    console.log(unixTimestamp)
    
    
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


