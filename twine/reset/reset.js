secondGo = false

function Submitted(){


    phoneNum = document.getElementById("phonenumber").value


    let match = phoneNum.match(/^\d{10}$/);
    if (match) {
        isAPhoneNum = true
        document.getElementsByClassName("badphone")[0].style.display = "none"
        console.log("valid phone")
    } else {
        isAPhoneNum = false
        document.getElementsByClassName("badphone")[0].style.display = "block"
        console.log("invalid phone input")
    }

    data = {
        "intention": "reset",
        "phoneNumber": phoneNum
    }


    if (isAPhoneNum && !secondGo) {
        fetch('http://34.220.148.83:8000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.text())
            .then(data => {
                console.log(data)

                dataObj = JSON.parse(data)
                
                if (dataObj["verdict"] == "nophone"){
                    // phone is not linked to an account
                    document.getElementsByClassName("nophone")[0].style.display = "block"
                } else {
                    document.getElementsByClassName("nophone")[0].style.display = "none"
                }

                if (dataObj["verdict"] == "success"){
                    secondGo = true
                    second(phoneNum)
                }

            });

    }
}



function second(phoneNum){
    document.getElementById("phonenumber").style.display = "none"
    listy = document.getElementsByClassName("needed")

    for (const item of listy) {
        item.style.display = "block"
    }
}