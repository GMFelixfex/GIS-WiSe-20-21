"use strict";
var Abgabe3;
(function (Abgabe3) {
    function getPage() {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }
    let subButton = document.getElementById("submitData");
    subButton.addEventListener("click", setValue);
    function setValue() {
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let adrr = document.getElementById("adrr");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        console.log("data");
        let page = getPage();
        let missingBool = false;
        //checkt die verschiedenen eingabefelder und makiert sie fals etwas fehlt
        if (page != "loaduser.html") {
            if (page == "index.html") {
                if (fname.value == "") {
                    fname.style.border = "1px solid rgb(255, 60, 60)";
                    fname.style.backgroundColor = "rgb(255, 214, 214)";
                    missingBool = true;
                }
                else {
                    fname.style.border = "1px solid #ccc";
                    fname.style.backgroundColor = "lightgrey";
                }
                if (lname.value == "") {
                    lname.style.border = "1px solid rgb(255, 60, 60)";
                    lname.style.backgroundColor = "rgb(255, 214, 214)";
                    missingBool = true;
                }
                else {
                    lname.style.border = "1px solid #ccc";
                    lname.style.backgroundColor = "lightgrey";
                }
                if (adrr.value == "") {
                    adrr.style.border = "1px solid rgb(255, 60, 60)";
                    adrr.style.backgroundColor = "rgb(255, 214, 214)";
                    missingBool = true;
                }
                else {
                    adrr.style.border = "1px solid #ccc";
                    adrr.style.backgroundColor = "lightgrey";
                }
            }
            if (email.value == "") {
                email.style.border = "1px solid rgb(255, 60, 60)";
                email.style.backgroundColor = "rgb(255, 214, 214)";
                missingBool = true;
            }
            else {
                email.style.border = "1px solid #ccc";
                email.style.backgroundColor = "lightgrey";
            }
            if (password.value == "") {
                password.style.border = "1px solid rgb(255, 60, 60)";
                password.style.backgroundColor = "rgb(255, 214, 214)";
                missingBool = true;
            }
            else {
                password.style.border = "1px solid #ccc";
                password.style.backgroundColor = "lightgrey";
            }
        }
        //frägt ab ob alle daten vorhanden sind wenn nicht gibt es einen Text aus 
        let bod = document.getElementById("ErrorText");
        if (missingBool == false) {
            let formData = new FormData(document.forms[0]);
            bod.innerHTML = "";
            bod.style.width = "";
            getSMessage(formData);
        }
        else {
            bod.innerHTML = "<p> Eingaben vergessen! Bitte alles rot makierte eintragen</p>";
            bod.style.width = "50%";
        }
    }
    async function getSMessage(_formdata) {
        let path = getPage();
        let url = "http://localhost:8100/" + path;
        let query = new URLSearchParams(_formdata);
        console.log(query);
        url = url + "?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        let message = await response.text();
        console.log(message);
        showServerMessage2(message);
    }
    function showServerMessage2(_message) {
        let bod = document.getElementById("ErrorText");
        bod.innerHTML = _message;
        bod.style.width = "50%";
    }
})(Abgabe3 || (Abgabe3 = {}));
//# sourceMappingURL=script.js.map