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

fetch('http://34.220.148.83:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.text())
                .then(data => {
                    
                    htString = '<h1 id="gtitle">Groups</h1><hr>'
    
                    dataObj = JSON.parse(data)
                    
                    for (let i = 0; i < dataObj.length; i++) {
                        htString = htString + '<div class="section"><h3 onclick="groupClicked(' + i + ')">' + dataObj[i][1] + '</h3><hr></div>'
                    }
                    document.getElementById("innervert").innerHTML = htString

                });
    


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("name").innerHTML = localStorage.getItem("name")
    document.getElementById("number").innerHTML = localStorage.getItem("phoneNumber")
});



function groupClicked(i){
    alert(i + "was clicked")
}




