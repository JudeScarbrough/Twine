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

    window.location.href = "../index.html"
}


    


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("name").innerHTML = localStorage.getItem("name")
    document.getElementById("number").innerHTML = localStorage.getItem("phoneNumber")
});







function createGroup(){
    groupName = document.getElementById("groupName").value
    desc = document.getElementById("descy").value

    if (groupName == "" || desc == ""){
        alert("Enter a valid name and Description.")
    } else {
        submitGroup({"phoneNumber": localStorage.getItem("phoneNumber"), "groupName": groupName, "groupDesc": desc, "intention": "createGroup"})
    }



}

function submitGroup(data){
    fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.text())
        .then(data => {

            dataOBJ = JSON.parse(data)
            if (dataOBJ["Verdict"] == "success"){
                successFunc()
            }

        });
}

function successFunc(){
    document.getElementById("cgdiv").innerHTML = "<h1>Successfully Created a Group</h1><a style='text-decoration: none;' href='../managegroup/managegroup.html'><button class='dashbutton' style='margin: 20px auto 0px; width: 300px;'>Manage Groups</button></a><div style='height: 50px;'></div>"
}