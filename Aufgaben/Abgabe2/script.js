"use strict";
var Abgabe2;
(function (Abgabe2) {
    let hBody = document.body;
    //Arrays/Variablen für die verwendung im Script
    let saveObject = [];
    let partsString = ["Waffel", "Belag", "Eis", "Halter"];
    let selectedParts = [-1, -1, -1, -1];
    let curSite = "";
    let innerSite = "";
    let curSiteNumber = -1;
    let pages = ["ndex", "Halter", "Eis", "Belag", "Waffel", "ndex"];
    let stilEng = ["Holder", "Ice", "Topping", "Waffel"];
    let sendServer;
    //let countw: number = 0;
    //Klasse für ds versendete serverpaket
    class ServerPaket {
        constructor(_waffel, _belag, _eis, _halter) {
            this.waffel = _waffel;
            this.belag = _belag;
            this.eis = _eis;
            this.halter = _halter;
        }
    }
    // Klasse für die verschiedenen objekte
    class EisBase {
        constructor(_name, _preis, _stil, _path) {
            if (_name === undefined)
                _name = "Namenlos";
            if (_preis === undefined)
                _preis = 0;
            if (_stil === undefined)
                _stil = "Waffel";
            if (_path === undefined)
                _path = "../Abgabe2/Media/default.png";
            this.name = _name;
            this.preis = _preis;
            this.stil = _stil;
            this.path = _path;
        }
        flexCreate() {
            let newElemnt = document.createElement("div");
            let divWaffel = document.getElementById("divGen");
            divWaffel.appendChild(newElemnt);
            newElemnt.setAttribute("class", "generated");
            newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
            //countw++;
        }
    }
    //#region Element Erstellung
    //Parsing and Creation of Elements/Selection (läd aus der data.json alle  elemnte in das saveObject array)
    async function jayson() {
        let response = await fetch("data.json");
        let json = await response.json();
        let jsonString = JSON.stringify(json);
        return jsonString;
    }
    async function parsingJson() {
        if (curSite != "index") {
            loadDisplay("fortschritt");
        }
        let pjson = JSON.parse(await jayson());
        let i = 0;
        for (let key in pjson) {
            if (pjson[key].stil == innerSite) {
                let obj = new EisBase(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
                saveObject[i] = obj;
                i++;
                obj.flexCreate();
            }
        }
    }
    //#endregion
    //Erstellt eine Flexbox für  die verschiedenen auswahlmöglichkeiten
    function divCreate() {
        let partsDiv = document.getElementById("PartsDiv");
        let newDiv = document.createElement("div");
        partsDiv.appendChild(newDiv);
        newDiv.setAttribute("id", "divGen");
    }
    //#region selection handeling (Schaut ob einer der Außwahlmöglichkeiten ausgewählt ist)
    function listenToSelection() {
        let arrGenerated = document.getElementsByClassName("generated");
        for (let i = 0; i < arrGenerated.length; i++) {
            arrGenerated[i].addEventListener("click", function () { selectedObj(i, arrGenerated); });
        }
    }
    function selectedObj(k, arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].setAttribute("id", "");
        }
        arr[k].setAttribute("id", "selectedObj");
        selectedParts[curSiteNumber] = k;
    }
    //Läd aus dem Lokal storage die Displayitems und zeiigt sie abhängig von de seite an 
    function loadDisplay(_ausw) {
        let saveEis = [];
        for (let i = 0; i < 4; i++) {
            let arrEis = JSON.parse(localStorage.getItem(partsString[i]));
            if (arrEis != null) {
                saveEis[i] = new EisBase(arrEis.name, arrEis.preis, arrEis.stil, arrEis.path);
            }
        }
        displayRes(saveEis, _ausw);
        //Extrafunktion falls die Seite die Index seite ist
        if (curSite == "index") {
            sendServer = new ServerPaket(saveEis[0], saveEis[1], saveEis[2], saveEis[3]);
            let sentJson = JSON.stringify(sendServer);
            localStorage.setItem("Configuration", sentJson);
            displayProduct(saveEis[0], saveEis[1], saveEis[2], saveEis[3]);
        }
    }
    //displayed den Fortschritt an der linken seite der Website
    function displayRes(_arrEisBase, _ausw) {
        let divAus = document.getElementById(_ausw);
        for (let i = 0; i < 4; i++) {
            let ausWahl = document.createElement("div");
            if (_arrEisBase[i] != undefined) {
                divAus.replaceChild(ausWahl, document.getElementById(_ausw + _arrEisBase[i].stil));
                ausWahl.setAttribute("id", _ausw + _arrEisBase[i].stil);
            }
            if (_ausw == "ausgewahlt") {
                if (_arrEisBase[i] != undefined) {
                    ausWahl.innerHTML = "<img src = " + _arrEisBase[i].path + "></img>" + "<h2>Extra: " + _arrEisBase[i].name + "</h2><h2>Preis: " + _arrEisBase[i].preis + "€ </h2>";
                }
            }
            else {
                if (_arrEisBase[i] != undefined) {
                    ausWahl.innerHTML = "<img src = " + _arrEisBase[i].path + "></img>";
                    if (curSite != "index") {
                        ausWahl.style.marginTop = "-300px";
                    }
                }
            }
        }
    }
    //Erstellt den text  mit dem preis an der Seite der Index(Start/End) Seite (Übergabeparameter kein array, um übersicht zu halten)
    function displayProduct(_waf, _top, _ice, _hol) {
        let produktDiv = document.getElementById("Produkt");
        produktDiv.innerHTML = "<b><u>Ihr Eis: </u></b><br>";
        if (_ice == undefined && _hol == undefined && _waf == undefined && _top == undefined) {
            produktDiv.innerHTML = "";
        }
        else {
            let price = 0;
            if (_ice != undefined) {
                produktDiv.innerHTML += _ice.name + "-Eis ";
                price += _ice.preis;
            }
            else {
                produktDiv.innerHTML += "Eisloses Eis ";
            }
            if (_top != undefined) {
                produktDiv.innerHTML += " mit " + _top.name;
                price += _top.preis;
            }
            if (_hol != undefined) {
                produktDiv.innerHTML += " in einer(-em) " + _hol.name;
                price += _hol.preis;
            }
            else {
                produktDiv.innerHTML += "ohne Halter";
            }
            if (_waf != undefined) {
                produktDiv.innerHTML += " plus extra " + _waf.name;
                price += _waf.preis;
            }
            produktDiv.innerHTML += "<br><b><u>Preis:</u> " + price + "€</b>";
        }
    }
    //#endregion
    //#region Buttonlogic
    function saveButton() {
        if (selectedParts[curSiteNumber] != -1) {
            let obj = saveObject[selectedParts[curSiteNumber]];
            let myJSON = JSON.stringify(obj);
            localStorage.setItem(curSite, myJSON);
            window.open("i" + pages[curSiteNumber + 2] + ".html", "_self");
        }
    }
    function startButton() {
        localStorage.clear();
        window.open("iHalter.html", "_self");
    }
    function backButton() {
        window.open("i" + pages[curSiteNumber] + ".html", "_self");
    }
    //#endregion
    //#region Multi-Eventhandler  (Buttons und laden der Seite)
    function eventHandler() {
        if (curSite == "index") {
            document.getElementById("startButton").addEventListener("click", startButton);
        }
        if (curSite != "index") {
            document.addEventListener("load", function () { loadDisplay("fortschritt"); });
            document.getElementById("saveButton").addEventListener("click", saveButton);
            document.getElementById("backButton").addEventListener("click", backButton);
        }
    }
    //#endregion
    //WICHTIG: Setzt die derzeitige Seite fest; wird sehr viel im verlauf des Codes gebraucht
    function siteHandle() {
        let currentSite = document.getElementById("Headline");
        if (currentSite.innerHTML == "Your Icecream Generator: Start/End") {
            curSiteNumber = 4;
            curSite = "index";
            innerSite = "index";
        }
        if (currentSite.innerHTML == "Your Icecream Generator: Halter") {
            curSiteNumber = 0;
            curSite = "Halter";
            innerSite = "Holder";
        }
        if (currentSite.innerHTML == "Your Icecream Generator: Eis") {
            curSiteNumber = 1;
            curSite = "Eis";
            innerSite = "Ice";
        }
        if (currentSite.innerHTML == "Your Icecream Generator: Belag") {
            curSiteNumber = 2;
            curSite = "Belag";
            innerSite = "Topping";
        }
        if (currentSite.innerHTML == "Your Icecream Generator: Extra") {
            curSiteNumber = 3;
            curSite = "Waffel";
            innerSite = "Waffel";
        }
        return null;
    }
    //Checkt ob man schonmal auf der Index seite war (Nach dem start oder Reset), ist schöner den code so zu lassen als ihn zu kürzen!
    function siteVisited() {
        let pWaf = JSON.parse(localStorage.getItem("Waffel"));
        let pTop = JSON.parse(localStorage.getItem("Belag"));
        let pIce = JSON.parse(localStorage.getItem("Eis"));
        let pHol = JSON.parse(localStorage.getItem("Halter"));
        if (pIce == null && pHol == null && pWaf == null && pTop == null) {
            return false;
        }
        else {
            return true;
        }
    }
    function createAuswahltDiv() {
        let auswahl = document.createElement("div");
        auswahl.setAttribute("id", "ausgewahlt");
        hBody.appendChild(auswahl);
        for (let i = 0; i < 4; i++) {
            let auswahlDiv = document.createElement("div");
            auswahlDiv.setAttribute("id", "ausgewahlt" + stilEng[i]);
            auswahl.appendChild(auswahlDiv);
        }
    }
    //Verändert den Startbutton beim erstmaligem besuchen der index seite bzw. wenn der Cache gecleared wurde
    function startSite() {
        let startButton = document.getElementById("startButton");
        startButton.style.width = "600px";
        startButton.style.height = "400px";
        startButton.style.margin = "400px 0px 0px 400px";
        startButton.style.fontSize = "190px";
        startButton.innerHTML = "Start";
    }
    async function getServerMessage(_url) {
        let browserCacheData = JSON.parse(localStorage.getItem("Configuration"));
        let query = new URLSearchParams(browserCacheData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let message = await response.json();
        showServerMessage(message);
    }
    function showServerMessage(_message) {
        let messageDiv = document.getElementById("serverMessage");
        if (_message.message != undefined) {
            messageDiv.textContent = "Server-Message: " + _message.message;
            messageDiv.style.color = "blue";
        }
        else if (_message.error != undefined) {
            messageDiv.textContent = "Server-Message: " + _message.error;
            messageDiv.style.color = "red";
        }
    }
    //Normaler seiten-ablauf( Einfach für die übersicht)
    init();
    function init() {
        siteHandle();
        eventHandler();
        divCreate();
        parsingJson();
        setTimeout(listenToSelection, 100);
        if (curSite == "index" && siteVisited() == true) {
            createAuswahltDiv();
            loadDisplay("fortschritt");
            loadDisplay("ausgewahlt");
            getServerMessage("https://gis-communication.herokuapp.com/");
        }
        else if (curSite == "index" && siteVisited() == false) {
            startSite();
        }
    }
})(Abgabe2 || (Abgabe2 = {}));
//# sourceMappingURL=script.js.map
