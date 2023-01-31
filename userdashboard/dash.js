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

data = {
    "intention": "loadDashboard",
    "phoneNumber": localStorage.getItem("phoneNumber")
}

fetch('http://34.220.148.83:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.text())
                .then(data => {
                    
    
                    dataObj = JSON.parse(data)

                    userData = JSON.parse(dataObj["userData"][0])

                    localStorage.setItem("userData", JSON.stringify(userData))

                    if (userData["adminAccount"] == "yes"){
                        window.location.href = "../admindashboard/admindashboard.html"
                    }
                    


                    listy = dataObj["groupData"]


                    bigString = ""

                    listy.forEach(function(item) {
                        bigString = bigString + makeBlock(item)
                    });

                    document.getElementById("righttable").innerHTML = bigString

                    
    

                });
    


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("name").innerHTML = localStorage.getItem("name")
    document.getElementById("number").innerHTML = localStorage.getItem("phoneNumber")
});









function makeBlock(blockData){
    return "<div class='groupbox'><a><h1 id='boxtitle'>" + blockData[1] + "</h1></a><h2 id='boxsubtitle'>" + blockData[2] + "</h2><a id='boxa'><button class='boxbutton'>Preferences</button></a></div>"
}