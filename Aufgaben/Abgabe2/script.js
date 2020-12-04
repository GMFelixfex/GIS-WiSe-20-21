"use strict";
let hHead = document.head;
let hBody = document.body;
let saveWaffel = [];
let saveTopping = [];
let saveIce = [];
let saveHolder = [];
let selectedParts = [-1, -1, -1, -1];
let curSite = "";
let sendServer;
class ServerPaket {
    constructor(_waffel, _belag, _eis, _halter) {
        this.waffel = _waffel;
        this.belag = _belag;
        this.eis = _eis;
        this.halter = _halter;
    }
}
let countw = 0;
class Waffel {
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
        let divWaffel = document.getElementById("divWaffel");
        divWaffel.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generatedWaffel");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveWaffel[countw] = this;
        countw++;
    }
}
let countt = 0;
class Topping {
    constructor(_name, _preis, _stil, _path) {
        if (_name === undefined)
            _name = "Namenlos";
        if (_preis === undefined)
            _preis = 0;
        if (_stil === undefined)
            _stil = "Topping";
        if (_path === undefined)
            _path = "../Abgabe2/Media/default.png";
        this.name = _name;
        this.preis = _preis;
        this.stil = _stil;
        this.path = _path;
    }
    flexCreate() {
        let newElemnt = document.createElement("div");
        let divTopping = document.getElementById("divTopping");
        divTopping.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generatedTopping");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveTopping[countt] = this;
        countt++;
    }
}
let counti = 0;
class Ice {
    constructor(_name, _preis, _stil, _path) {
        if (_name === undefined)
            _name = "Namenlos";
        if (_preis === undefined)
            _preis = 0;
        if (_stil === undefined)
            _stil = "Ice";
        if (_path === undefined)
            _path = "../Abgabe2/Media/default.png";
        this.name = _name;
        this.preis = _preis;
        this.stil = _stil;
        this.path = _path;
    }
    flexCreate() {
        let newElemnt = document.createElement("div");
        let divIce = document.getElementById("divIce");
        divIce.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generatedIce");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveIce[counti] = this;
        counti++;
    }
}
let counth = 0;
class Holder {
    constructor(_name, _preis, _stil, _path) {
        if (_name === undefined)
            _name = "Namenlos";
        if (_preis === undefined)
            _preis = 0;
        if (_stil === undefined)
            _stil = "Holder";
        if (_path === undefined)
            _path = "../Abgabe2/Media/default.png";
        this.name = _name;
        this.preis = _preis;
        this.stil = _stil;
        this.path = _path;
    }
    flexCreate() {
        let newElemnt = document.createElement("div");
        let divHolder = document.getElementById("divHolder");
        divHolder.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generatedHolder");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveHolder[counth] = this;
        counth++;
    }
}
//Parsing and Creation of Elements/Selection
async function parsingJson() {
    if (siteHandle() != "index") {
        loadDisplay("fortschritt");
    }
    let pjson = JSON.parse(await jayson());
    let i = 0;
    let j = 0;
    let k = 0;
    let l = 0;
    for (let key in pjson) {
        if (pjson[key].stil == "Waffel" && (siteHandle() == "Waffel")) {
            let obj = new Waffel(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveWaffel[i] = obj;
            i++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Topping" && (siteHandle() == "Belag")) {
            let obj = new Topping(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveTopping[j] = obj;
            j++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Ice" && (siteHandle() == "Eis")) {
            let obj = new Ice(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveIce[k] = obj;
            k++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Holder" && (siteHandle() == "Halter")) {
            let obj = new Holder(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveHolder[l] = obj;
            l++;
            obj.flexCreate();
        }
    }
}
//#region Creation the Selection flexbox
function defaultDivCreation() {
    if (siteHandle() == "Waffel") {
        divCreate("Waffel");
    }
    if (siteHandle() == "Belag") {
        divCreate("Topping");
    }
    if (siteHandle() == "Eis") {
        divCreate("Ice");
    }
    if (siteHandle() == "Halter") {
        divCreate("Holder");
    }
}
function divCreate(_type) {
    let partsDiv = document.getElementById("PartsDiv");
    let newDiv = document.createElement("div");
    partsDiv.appendChild(newDiv);
    newDiv.setAttribute("id", "div" + _type);
}
//#endregion
//#region selection handeling
//alles mit id=generated, sodass mann nur einmal laden muss (kürzen)
function listenToSelection() {
    let arrHolder = document.getElementsByClassName("generatedHolder");
    let arrIce = document.getElementsByClassName("generatedIce");
    let arrTopping = document.getElementsByClassName("generatedTopping");
    let arrWaffel = document.getElementsByClassName("generatedWaffel");
    for (let i = 0; i < arrHolder.length; i++) {
        arrHolder[i].addEventListener("click", function () { selectHolder(i, arrHolder); });
    }
    for (let i = 0; i < arrIce.length; i++) {
        arrIce[i].addEventListener("click", function () { selectIce(i, arrIce); });
    }
    for (let i = 0; i < arrTopping.length; i++) {
        arrTopping[i].addEventListener("click", function () { selectTopping(i, arrTopping); });
    }
    for (let i = 0; i < arrWaffel.length; i++) {
        arrWaffel[i].addEventListener("click", function () { selectWaffel(i, arrWaffel); });
    }
}
function selectHolder(k, arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedHolder");
    selectedParts[0] = k;
}
function selectIce(k, arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedIce");
    selectedParts[1] = k;
}
function selectTopping(k, arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedTopping");
    selectedParts[2] = k;
}
function selectWaffel(k, arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedWaffle");
    selectedParts[3] = k;
}
function loadDisplay(_ausw) {
    let pWaf = JSON.parse(localStorage.getItem("Waffel"));
    let pTop = JSON.parse(localStorage.getItem("Belag"));
    let pIce = JSON.parse(localStorage.getItem("Eis"));
    let pHol = JSON.parse(localStorage.getItem("Halter"));
    let myWaffel;
    let myTopping;
    let myIce;
    let myHolder;
    if (pWaf != null) {
        myWaffel = new Waffel(pWaf.name, pWaf.preis, pWaf.stil, pWaf.path);
    }
    if (pTop != null) {
        myTopping = new Topping(pTop.name, pTop.preis, pTop.stil, pTop.path);
    }
    if (pIce != null) {
        myIce = new Ice(pIce.name, pIce.preis, pIce.stil, pIce.path);
    }
    if (pHol != null) {
        myHolder = new Holder(pHol.name, pHol.preis, pHol.stil, pHol.path);
    }
    displayRes(myWaffel, myTopping, myIce, myHolder, _ausw);
    if (siteHandle() == "index") {
        sendServer = new ServerPaket(myWaffel, myTopping, myIce, myHolder);
        let sentJson = JSON.stringify(sendServer);
        localStorage.setItem("Configuration", sentJson);
        displayProduct(myWaffel, myTopping, myIce, myHolder);
    }
}
let needUpdate = [];
function displayRes(_waf, _top, _ice, _hol, _ausw) {
    let ausWaffel = document.createElement("div");
    let ausTopping = document.createElement("div");
    let ausIce = document.createElement("div");
    let ausHolder = document.createElement("div");
    let divAus = document.getElementById(_ausw);
    if (_waf != undefined) {
        divAus.replaceChild(ausWaffel, document.getElementById(_ausw + "Waffel"));
        ausWaffel.setAttribute("id", _ausw + _waf.stil);
    }
    if (_top != undefined) {
        divAus.replaceChild(ausTopping, document.getElementById(_ausw + "Topping"));
        ausTopping.setAttribute("id", _ausw + _top.stil);
    }
    if (_ice != undefined) {
        divAus.replaceChild(ausIce, document.getElementById(_ausw + "Ice"));
        ausIce.setAttribute("id", _ausw + _ice.stil);
    }
    if (_hol != undefined) {
        divAus.replaceChild(ausHolder, document.getElementById(_ausw + "Holder"));
        ausHolder.setAttribute("id", _ausw + _hol.stil);
    }
    if (_ausw == "ausgewahlt") {
        if (_waf != undefined) {
            ausWaffel.innerHTML = "<img src = " + _waf.path + "></img>" + "<h2>Extra: " + _waf.name + "</h2><h2>Preis: " + _waf.preis + "€ </h2>";
        }
        if (_top != undefined) {
            ausTopping.innerHTML = "<img src = " + _top.path + "></img>" + "<h2>Belag: " + _top.name + "</h2><h2>Preis: " + _top.preis + "€ </h2>";
        }
        if (_ice != undefined) {
            ausIce.innerHTML = "<img src = " + _ice.path + "></img>" + "<h2>Eis: " + _ice.name + "</h2><h2>Preis: " + _ice.preis + "€ </h2>";
        }
        if (_hol != undefined) {
            ausHolder.innerHTML = "<img src = " + _hol.path + "></img>" + "<h2>Halter: " + _hol.name + "</h2><h2>Preis: " + _hol.preis + "€ </h2>";
        }
    }
    else {
        if (_waf != undefined) {
            ausWaffel.innerHTML = "<img src = " + _waf.path + "></img>";
            if (siteHandle() != "index") {
                ausWaffel.style.marginTop = "-300px";
            }
        }
        if (_top != undefined) {
            ausTopping.innerHTML = "<img src = " + _top.path + "></img>";
            if (siteHandle() != "index") {
                ausTopping.style.marginTop = "-300px";
            }
        }
        if (_ice != undefined) {
            ausIce.innerHTML = "<img src = " + _ice.path + "></img>";
            if (siteHandle() != "index") {
                ausIce.style.marginTop = "-300px";
            }
        }
        if (_hol != undefined) {
            ausHolder.innerHTML = "<img src = " + _hol.path + "></img>";
            if (siteHandle() != "index") {
                ausHolder.style.marginTop = "-300px";
            }
        }
    }
}
function displayProduct(_waf, _top, _ice, _hol) {
    let produktDiv = document.getElementById("Produkt");
    produktDiv.innerHTML = "<b><u>Ihr Eis: </u></b><br>";
    if (_ice == undefined && _hol == undefined && _waf == undefined && _top == undefined) {
        produktDiv.innerHTML = "";
    }
    else {
        let price = 0;
        if (_ice != undefined) {
            produktDiv.innerHTML += _ice.name + "-Eis";
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
//#region Buttonlogic und Display
function saveButton() {
    if ((siteHandle() == "Waffel") && selectedParts[3] != -1) {
        let obj = saveWaffel[selectedParts[3]];
        let myJSON = JSON.stringify(obj);
        localStorage.setItem("Waffel", myJSON);
        window.open("index.html", "_self");
    }
    if ((siteHandle() == "Belag") && selectedParts[2] != -1) {
        let obj2 = saveTopping[selectedParts[2]];
        let myJSON2 = JSON.stringify(obj2);
        localStorage.setItem("Belag", myJSON2);
        window.open("iwaffel.html", "_self");
    }
    if ((siteHandle() == "Eis") && selectedParts[1] != -1) {
        let obj3 = saveIce[selectedParts[1]];
        let myJSON3 = JSON.stringify(obj3);
        localStorage.setItem("Eis", myJSON3);
        window.open("ibelag.html", "_self");
    }
    if ((siteHandle() == "Halter") && selectedParts[0] != -1) {
        let obj4 = saveHolder[selectedParts[0]];
        let myJSON4 = JSON.stringify(obj4);
        localStorage.setItem("Halter", myJSON4);
        window.open("ieis.html", "_self");
    }
}
function startButton() {
    localStorage.clear();
    window.open("ihalter.html", "_self");
}
function backButton() {
    if (siteHandle() == "Waffel") {
        window.open("ibelag.html", "_self");
    }
    if (siteHandle() == "Belag") {
        window.open("ieis.html", "_self");
    }
    if (siteHandle() == "Eis") {
        console.log("back");
        window.open("ihalter.html", "_self");
    }
    if (siteHandle() == "Halter") {
        window.open("index.html", "_self");
    }
}
//#endregion
//#region Multi-Eventhandler
if (siteHandle() == "index") {
    document.getElementById("startButton").addEventListener("click", startButton);
}
if (siteHandle() != "index") {
    document.addEventListener("load", function () { loadDisplay("fortschritt"); });
    document.getElementById("saveButton").addEventListener("click", saveButton);
    document.getElementById("backButton").addEventListener("click", backButton);
}
//#endregion
//Reloads the Site to ensure generated emlemnt are loaded
let once = true;
function preloadElements(time) {
    if (once) {
        console.log("Elemnte Preloaden");
        once = false;
        setTimeout(preloadElements, time);
    }
}
async function jayson() {
    let response = await fetch("data.json");
    let json = await response.json();
    let jsonString = JSON.stringify(json);
    return jsonString;
}
function siteHandle() {
    let currentSite = document.getElementById("Headline");
    if (currentSite.innerHTML == "Your Icecream Generator: Start/End") {
        return "index";
    }
    if (currentSite.innerHTML == "Your Icecream Generator: Halter") {
        return "Halter";
    }
    if (currentSite.innerHTML == "Your Icecream Generator: Eis") {
        return "Eis";
    }
    if (currentSite.innerHTML == "Your Icecream Generator: Belag") {
        return "Belag";
    }
    if (currentSite.innerHTML == "Your Icecream Generator: Extra") {
        return "Waffel";
    }
    return null;
}
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
function visitingIndex() {
    let auswahl = document.createElement("div");
    let aHol = document.createElement("div");
    let aIce = document.createElement("div");
    let aTop = document.createElement("div");
    let aWaf = document.createElement("div");
    auswahl.setAttribute("id", "ausgewahlt");
    aIce.setAttribute("id", "ausgewahltIce");
    aHol.setAttribute("id", "ausgewahltHolder");
    aTop.setAttribute("id", "ausgewahltTopping");
    aWaf.setAttribute("id", "ausgewahltWaffel");
    auswahl.appendChild(aHol);
    auswahl.appendChild(aIce);
    auswahl.appendChild(aTop);
    auswahl.appendChild(aWaf);
    hBody.appendChild(auswahl);
}
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
init();
function init() {
    defaultDivCreation();
    parsingJson();
    setTimeout(listenToSelection, 100);
    listenToSelection();
    if (siteHandle() == "index" && siteVisited() == true) {
        visitingIndex();
        loadDisplay("fortschritt");
        setTimeout(function () { loadDisplay("ausgewahlt"); }, 100);
        getServerMessage("https://gis-communication.herokuapp.com/");
    }
    else if (siteHandle() == "index" && siteVisited() == false) {
        startSite();
    }
}
//# sourceMappingURL=script.js.map