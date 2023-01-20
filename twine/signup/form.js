pwdMatch = true
isAPhoneNum = true
isAName = true
pwdHas = true
pwBanned = true
nameBanned = true

hasSubmitted = false

bannedList = ["(", ")", "'", "[", "]", "{", "}", "~", "`"]

function Submitted(){
    phoneNum = document.getElementById('phonenumber').value
    fullName = document.getElementById('fullname').value
    password1 = document.getElementById('password').value
    password2 = document.getElementById('password2').value

    displayPhoneTaken("no")
    
    console.log(phoneNum, fullName, password1, password2)

    // check if passwords match
    if (password1 !== password2){
        document.getElementsByClassName('pwdnomatch')[0].style.display = "block";
        pwdMatch = false
    } else {
        pwdMatch = true
        document.getElementsByClassName('pwdnomatch')[0].style.display = "none";
    }

    // check if phone number is 10 numbers
    let match = phoneNum.match(/^\d{10}$/);
    if (match) {
        isAPhoneNum = true
        document.getElementsByClassName('badphone')[0].style.display = "none";
    } else {
        isAPhoneNum = false
        document.getElementsByClassName('badphone')[0].style.display = "block";
    }
    
    // check if valid full name
    let nameArray = fullName.split(" ");
    isAName = nameArray.length === 2;
    if (!isAName){
        document.getElementsByClassName('invalname')[0].style.display = "block";
    } else {
        document.getElementsByClassName('invalname')[0].style.display = "none";
    }

    // check if name contains invalid characters
    for (let i = 0; i < bannedList.length; i++) {
        if (fullName.includes(bannedList[i])) {
            nameBanned = false
            console.log("hmm")
            break;

            
        } else {
            nameBanned = true
            
        }
        
    }

    if (nameBanned == false) {
        document.getElementsByClassName('namebanchar')[0].style.display = "block";
    } else {
        document.getElementsByClassName('namebanchar')[0].style.display = "none";
    }



    // check if password contains invalid characters
    for (let i = 0; i < bannedList.length; i++) {
        if (password1.includes(bannedList[i])) {
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
    if (password1 == ""){
        document.getElementsByClassName('nopwd')[0].style.display = "block";
        pwdHas = false
    } else {
        document.getElementsByClassName('nopwd')[0].style.display = "none";
        pwdHas = true
    }
    

    function displayPhoneTaken(theVar){
        if (theVar == "yes"){
            document.getElementsByClassName('phonetaken')[0].style.display = "block";
            console.log("made it")
        }
        if (theVar == "no"){
            document.getElementsByClassName('phonetaken')[0].style.display = "none";
        }

    }



    // send to server
    data = {
        "intention": "signup",
        "phoneNumber": phoneNum,
        "fullName": fullName,
        "password": password1
    }

    if (pwdHas && pwdMatch && isAName && isAPhoneNum && pwBanned && !hasSubmitted){
        fetch('http://34.220.148.83:8000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.text())
            .then(data => {
                hasSubmitted = true


                dataObj = JSON.parse(data)
                if (dataObj["phoneTaken"] == "failed"){
                    displayPhoneTaken("yes")
                } else {
                    displayPhoneTaken("no")
                }
                if (dataObj["dataPlaced"] == "success") {
                    document.getElementsByClassName('input-fields')[0].style.display = "none"
                    document.getElementsByClassName("subtitle")[0].style.display = "none"
                    document.getElementsByClassName("welcome")[0].innerHTML = "Sign Up Successful!"
                    document.getElementsByClassName("createAcct")[0].style.display = "none"
                    document.getElementsByClassName("logbutt")[0].style.display = "block"
                    
                }





                console.log(data)

                
            });

    }


    



}