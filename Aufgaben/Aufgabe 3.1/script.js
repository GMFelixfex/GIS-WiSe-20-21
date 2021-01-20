"use strict";
var Aufgabe3_1;
(function (Aufgabe3_1) {
    /*
    function getSubpage(): string {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }
    */
    let subButton = document.getElementById("submitData");
    subButton.addEventListener("click", setValue);
    function setValue() {
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let mtrNr = document.getElementById("lname");
        let checkboxJson = document.getElementById("doJson");
        let doJson = checkboxJson.checked;
        fname.setAttribute("value", fname.value);
        lname.setAttribute("value", lname.value);
        mtrNr.setAttribute("value", mtrNr.value);
        let formData = new FormData(document.forms[0]);
        console.log(formData);
        getSMessage(formData, doJson);
    }
    async function getSMessage(_formdata, _doJson) {
        let path = "html";
        if (_doJson) {
            path = "json";
        }
        let url = "http://localhost:8100/" + path;
        let query = new URLSearchParams(_formdata);
        url = url + "?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        let message = await response.json();
        console.log(message);
        showServerMessage2(message);
    }
    function showServerMessage2(_message) {
        let messageDiv = document.createElement("div");
        let bod = document.getElementById("bod");
        messageDiv.innerHTML = "" + _message;
        bod.appendChild(messageDiv);
    }
})(Aufgabe3_1 || (Aufgabe3_1 = {}));
//# sourceMappingURL=script.js.map