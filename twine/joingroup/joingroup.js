function Submitted(){
    orgName = document.getElementById("orgName").value
    groupName = document.getElementById("groupName").value
    phoneNum = localStorage.getItem("phoneNumber")

    data = {
        "intention": "joinGroup",
        "phoneNumber": phoneNum,
        "orgName": orgName,
        "groupName": groupName
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

                    
    

                });
}