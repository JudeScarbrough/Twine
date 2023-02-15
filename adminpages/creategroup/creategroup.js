if(localStorage.getItem("userData") == "null"){
    window.location.href="../login/loginui.html"
}
if(JSON.parse(localStorage.getItem("userData"))["phoneVerified"] == "no"){
    window.location.href="../verify/verify.html"
}

function signOutFunc(){
    localStorage.setItem("userData", null)
    localStorage.setItem("name", null)
    localStorage.setItem("phoneNumber", null)
    localStorage.setItem("groupIds", null)

    window.location.href = "../index.html"
}


    


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("name").innerHTML = localStorage.getItem("name")
    document.getElementById("number").innerHTML = localStorage.getItem("phoneNumber")
});









