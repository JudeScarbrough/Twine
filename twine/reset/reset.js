secondGo = false
bannedList = ["(", ")", "'", "[", "]", "{", "}", "~", "`"]
pwdMatch = true
pwBanned = true
pwdHas = true

globalPhone = ""

function Submitted(){

    if (secondGo == true){

        password = document.getElementById("password").value
        password2 = document.getElementById("password2").value

        theCode = document.getElementById("theCode").value

        // check if passwords match
        if (password !== password2){
            document.getElementsByClassName('pwdnomatch')[0].style.display = "block";
            pwdMatch = false
        } else {
            pwdMatch = true
            document.getElementsByClassName('pwdnomatch')[0].style.display = "none";
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
        if (password == ""){
            document.getElementsByClassName('nopwd')[0].style.display = "block";
            pwdHas = false
        } else {
            document.getElementsByClassName('nopwd')[0].style.display = "none";
            pwdHas = true
        }

        data = {
            "intention": "reset2",
            "password": password,
            "phoneNumber": globalPhone,
            "theCode": theCode

        }
        if (pwdHas && pwBanned && pwdMatch) {
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
                    
                    if (dataObj["verdict"] == "success"){
                        listy1 = document.getElementsByClassName("predel")

                        for (const item of listy1) {
                            item.style.display = "none"
                        }
                    }
    
                });
    
        }



















    } else { // not second go (first go)


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
}



function second(phoneNum){

    globalPhone = phoneNum
    document.getElementById("phonenumber").style.display = "none"
    listy = document.getElementsByClassName("needed")

    for (const item of listy) {
        item.style.display = "block"
    }
}