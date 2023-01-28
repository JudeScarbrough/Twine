function Submitted(){
    groupID = document.getElementById("groupnum").value
    phoneNum = localStorage.getItem("phoneNumber")

    data = {
        "intention": "joinGroup",
        "phoneNumber": phoneNum,
        "groupID": groupID
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
                    
                    console.log(dataObj)
                    alert(dataObj["verdict"])

                    if (dataObj["verdict"] == "groupdoesnotexist"){
                        document.getElementsByClassName("nomatch")[0].style.display = "block"
                    } else {
                        document.getElementsByClassName("nomatch")[0].style.display = "none"
                    }

                    if (dataObj["verdict"] == "success"){
                        document.getElementsByClassName("success")[0].style.display = "block"
                    } else {
                        document.getElementsByClassName("success")[0].style.display = "none"
                    }

                    if (dataObj["verdict"] == "Already Joined"){
                        document.getElementsByClassName("alrjoin")[0].style.display = "block"
                    } else {
                        document.getElementsByClassName("alrjoin")[0].style.display = "none"
                    }

                    
    

                });
}