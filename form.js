pwdMatch = true
isAPhoneNum = true
isAName = true

nameBanned = true

bannedList = ["(", ")", "'", "[", "]", "{", "}", "~", "`"]

function Submitted(){
    phoneNum = document.getElementById('phonenumber').value
    fullName = document.getElementById('fullname').value
    password1 = document.getElementById('password').value
    password2 = document.getElementById('password2').value
    
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
    if (nameBanned == false){
        document.getElementsByClassName('namebanchar')[0].style.display = "block";
    } else {
        document.getElementsByClassName('namebanchar')[0].style.display = "none";
    }

    // check if password entered
    if (password1 == ""){
        document.getElementsByClassName('nopwd')[0].style.display = "block";
    } else {
        document.getElementsByClassName('nopwd')[0].style.display = "none";
    }
    data = {"agh": "agh"}



    // send to server

    fetch('http://34.220.148.83:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: 'some data' })
    }).then(response => response.text())
        .then(data => {
            console.log(data);
        });




}