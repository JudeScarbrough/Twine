secondGo = false
officialCode = ""

function Submitted(){
    if (secondGo){

    } else {

    phoneNum = localStorage.getItem("phoneNumber")

    data = {
        "intention": "verify",
        "phoneNumber": phoneNum
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
                    
                    if (dataObj["verdict"] == "success"){
                        officialCode = dataObj["theCode"]
                        rearrange()
                    }

                    

    

                });
    }
}

function rearrange(){
    document.getElementsByClassName("mainin")[0].style.display = "block"
    document.getElementsByClassName("createAcct")[0].style.display = "none"
    document.getElementsByClassName("verify")[0].style.display = "block"

}

function Verify(){
    inputtedCode = document.getElementById("theCode").value

    if (inputtedCode == officialCode){

        data = {
            "phoneNumber": localStorage.getItem("phoneNumber"),
            "intention": "markVerified"
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
                    
                    

                    localStorage.setItem("userData", dataObj["userData"])
                    document.getElementsByClassName("verify")[0].style.display = "none"
                    document.getElementsByClassName("mainin")[0].style.display = "none"
                    document.getElementsByClassName("welcome")[0].innerHTML = "Verification Successful"

                    document.getElementsByClassName("dashy")[0].style.display = "block"
    

                });
    }
    


}