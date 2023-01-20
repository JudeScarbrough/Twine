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


    if (isAPhoneNum) {
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
                







                


            });

    }
}