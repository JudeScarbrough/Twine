



isAPhoneNum = true
pwdHas = true
pwBanned = true

bannedList = ["(", ")", "'", "[", "]", "{", "}", "~", "`"]

function Submitted(){


    phoneNum = document.getElementById('phonenumber').value
    password = document.getElementById('password').value


    if (phoneNum == ""){
        document.getElementsByClassName('nophone')[0].style.display = "block";
    } else {
        document.getElementsByClassName('nophone')[0].style.display = "none";
    }

    let match = phoneNum.match(/^\d{10}$/);
    if (match) {
        isAPhoneNum = true
        // no input to user
        console.log("valid phone")
    } else {
        isAPhoneNum = false
        // display to users invalid phone input
        console.log("invalid phone input")
    }


    data = {
        "intention": "login",
        "phoneNumber": phoneNum,
        "password": password,
    }


    // check if password contains invalid characters
    for (let i = 0; i < bannedList.length; i++) {
        if (password.includes(bannedList[i])) {
            pwBanned = false
            console.log("hmm")
            break;


        } else {
            pwBanned = true

        }
    }

    if (pwBanned == false) {
        document.getElementsByClassName('pwban')[0].style.display = "block";
    } else {
        document.getElementsByClassName('pwban')[0].style.display = "none";
    }


    // check if password entered
    if (password == "") {
        document.getElementsByClassName('nopwd')[0].style.display = "block";
        pwdHas = false
    } else {
        document.getElementsByClassName('nopwd')[0].style.display = "none";
        pwdHas = true
    }








    if (isAPhoneNum && pwdHas && pwBanned) {
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
                if (dataObj["error"] == "wrongPW"){
                    document.getElementsByClassName("wrongPW")[0].style.display = "block";
                    console.log("no account")
                } else if (dataObj["error"] == "nouser"){
                    document.getElementsByClassName("nouser")[0].style.display = "block";
                    console.log("incorrect PW")
                } else {
                    localStorage.setItem("name", dataObj["main"][1])
                    localStorage.setItem("phoneNumber", dataObj["main"][2])
                    localStorage.setItem("groupIds", dataObj["main"][4])
                    localStorage.setItem("userData", dataObj["main"][5])

                }







                


            });

    }
}