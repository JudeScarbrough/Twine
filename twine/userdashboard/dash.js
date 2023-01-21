userData = JSON.parse(localStorage.getItem("userData"))

if(userData["phoneVerified"] == "no"){
    window.location.href = "../verify/verify.html"
}





document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("pp").innerHTML = localStorage.getItem("name") + " " + localStorage.getItem("phoneNumber") + " " + localStorage.getItem("userData")
});

