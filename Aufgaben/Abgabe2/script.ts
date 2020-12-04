let hHead: HTMLHeadElement = document.head;
let hBody: HTMLElement = document.body;

let saveWaffel: EisBase[] = [];
let saveTopping: EisBase[] = [];
let saveIce: EisBase[] = [];
let saveHolder: EisBase[] = [];
let partsString: string[] = ["Waffel", "Belag", "Eis", "Halter"];
let selectedParts: number[] = [-1, -1, -1, -1];
let curSite: string = "";
let curSiteNumber: number = -1;

let sendServer: ServerPaket;


class ServerPaket {
    waffel: EisBase;
    belag: EisBase;
    eis: EisBase;
    halter: EisBase;

    constructor(_waffel: EisBase, _belag: EisBase, _eis: EisBase, _halter: EisBase) {
        this.waffel = _waffel;
        this.belag = _belag;
        this.eis = _eis;
        this.halter = _halter;
    }

}

let countw: number = 0;
class EisBase {
    name: string;
    preis: number;
    stil: string;
    path: string;

    constructor(_name?: string, _preis?: number, _stil?: string, _path?: string) {
        if (_name === undefined) _name = "Namenlos";
        if (_preis === undefined) _preis = 0;
        if (_stil === undefined) _stil = "Waffel";
        if (_path === undefined) _path = "../Abgabe2/Media/default.png";
        this.name = _name;
        this.preis = _preis;
        this.stil = _stil;
        this.path = _path;
    }

    public flexCreate(): void {
        let newElemnt: HTMLDivElement = document.createElement("div");
        let divWaffel: HTMLElement = document.getElementById("divGen");
        divWaffel.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generated");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveWaffel[countw] = this;
        countw++;
    }


}


//Parsing and Creation of Elements/Selection
async function parsingJson(): Promise<void> {
    if (curSite != "index") { loadDisplay("fortschritt"); }

    let pjson: Parsing[] = JSON.parse(await jayson());
    let i: number = 0;
    let j: number = 0;
    let k: number = 0;
    let l: number = 0;
    for (let key in pjson) {

        if (pjson[key].stil == "Waffel" && (curSite == "Waffel")) {
            let obj: EisBase = new EisBase(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveWaffel[i] = obj;
            i++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Topping" && (curSite == "Belag")) {
            let obj: EisBase = new EisBase(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveTopping[j] = obj;
            j++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Ice" && (curSite == "Eis")) {
            let obj: EisBase = new EisBase(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveIce[k] = obj;
            k++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Holder" && (curSite == "Halter")) {
            let obj: EisBase = new EisBase(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveHolder[l] = obj;
            l++;
            obj.flexCreate();
        }
    }
}

//#region Creation the Selection flexbox

function divCreate(): void {
    let partsDiv: HTMLElement = document.getElementById("PartsDiv");
    let newDiv: HTMLDivElement = document.createElement("div");
    partsDiv.appendChild(newDiv);
    newDiv.setAttribute("id", "divGen");
}
//#endregion

//#region selection handeling

function listenToSelection(): void {
    let arrGenerated: HTMLCollectionOf<Element> = document.getElementsByClassName("generated");
    for (let i: number = 0; i < arrGenerated.length; i++) {
        arrGenerated[i].addEventListener("click", function (): void { selectedObj(i, arrGenerated); });
    }
}




function selectedObj(k: number, arr: HTMLCollectionOf<Element>): void {
    for (let i: number = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedHolder");


    selectedParts[curSiteNumber] = k;
}

//#endregion


//#region displays the Current Configuration and Endselection

interface Parsing {
    name: string;
    preis: number;
    stil: string;
    path: string;
}

//
//
// UNTERFKT Kürzen !!!
//
//

function loadDisplay(_ausw: string): void {
    let saveEis: EisBase[] = [];

    for (let i: number = 0; i < 4; i++) {
        let arrEis: Parsing = JSON.parse(localStorage.getItem(partsString[i]));
        saveEis[i] = new EisBase(arrEis.name, arrEis.preis, arrEis.stil, arrEis.path);
    }

    displayRes(saveEis[0], saveEis[1], saveEis[2], saveEis[3], _ausw);

    if (curSite == "index") {
        sendServer = new ServerPaket(saveEis[0], saveEis[1], saveEis[2], saveEis[3]);
        let sentJson: string = JSON.stringify(sendServer);
        localStorage.setItem("Configuration", sentJson);
        displayProduct(saveEis[0], saveEis[1], saveEis[2], saveEis[3]);
    }

}

let needUpdate: number[] = [];
function displayRes(_waf: EisBase, _top: EisBase, _ice: EisBase, _hol: EisBase, _ausw: string): void {
    let ausWaffel: HTMLDivElement = document.createElement("div");
    let ausTopping: HTMLDivElement = document.createElement("div");
    let ausIce: HTMLDivElement = document.createElement("div");
    let ausHolder: HTMLDivElement = document.createElement("div");
    let divAus: HTMLElement = document.getElementById(_ausw);

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
    } else {
        if (_waf != undefined) {
            ausWaffel.innerHTML = "<img src = " + _waf.path + "></img>";
            if (curSite != "index") { ausWaffel.style.marginTop = "-300px"; }
        }
        if (_top != undefined) {
            ausTopping.innerHTML = "<img src = " + _top.path + "></img>";
            if (curSite != "index") { ausTopping.style.marginTop = "-300px"; }
        }
        if (_ice != undefined) {
            ausIce.innerHTML = "<img src = " + _ice.path + "></img>";
            if (curSite != "index") { ausIce.style.marginTop = "-300px"; }
        }
        if (_hol != undefined) {
            ausHolder.innerHTML = "<img src = " + _hol.path + "></img>";
            if (curSite != "index") { ausHolder.style.marginTop = "-300px"; }
        }
    }



}

function displayProduct(_waf: EisBase, _top: EisBase, _ice: EisBase, _hol: EisBase): void {
    let produktDiv: HTMLElement = document.getElementById("Produkt");
    produktDiv.innerHTML = "<b><u>Ihr Eis: </u></b><br>";
    if (_ice == undefined && _hol == undefined && _waf == undefined && _top == undefined) {
        produktDiv.innerHTML = "";
    } else {
        let price: number = 0;
        if (_ice != undefined) {
            produktDiv.innerHTML += _ice.name + "-Eis ";
            price += _ice.preis;
        } else {
            produktDiv.innerHTML += "Eisloses Eis ";
        }

        if (_top != undefined) {
            produktDiv.innerHTML += " mit " + _top.name;
            price += _top.preis;
        }

        if (_hol != undefined) {
            produktDiv.innerHTML += " in einer(-em) " + _hol.name;
            price += _hol.preis;
        } else {
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

function saveButton(): void {
    if ((curSite == "Waffel") && selectedParts[3] != -1) {
        let obj: EisBase = saveWaffel[selectedParts[3]];
        let myJSON: string = JSON.stringify(obj);
        localStorage.setItem("Waffel", myJSON);
        window.open("index.html", "_self");
    }
    if ((curSite == "Belag") && selectedParts[2] != -1) {
        let obj2: EisBase = saveTopping[selectedParts[2]];
        let myJSON2: string = JSON.stringify(obj2);
        localStorage.setItem("Belag", myJSON2);
        window.open("iwaffel.html", "_self");
    }
    if ((curSite == "Eis") && selectedParts[1] != -1) {
        let obj3: EisBase = saveIce[selectedParts[1]];
        let myJSON3: string = JSON.stringify(obj3);
        localStorage.setItem("Eis", myJSON3);
        window.open("ibelag.html", "_self");
    }
    if ((curSite == "Halter") && selectedParts[0] != -1) {
        let obj4: EisBase = saveHolder[selectedParts[0]];
        let myJSON4: string = JSON.stringify(obj4);
        localStorage.setItem("Halter", myJSON4);
        window.open("ieis.html", "_self");
    }

}

function startButton(): void {
    localStorage.clear();
    window.open("ihalter.html", "_self");
}

function backButton(): void {
    if (curSite == "Waffel") {
        window.open("ibelag.html", "_self");
    }
    if (curSite == "Belag") {
        window.open("ieis.html", "_self");
    }
    if (curSite == "Eis") {
        console.log("back");
        window.open("ihalter.html", "_self");
    }
    if (curSite == "Halter") {
        window.open("index.html", "_self");
    }
}
//#endregion

//#region Multi-Eventhandler
function eventHandler(): void {
    if (curSite == "index") {
        document.getElementById("startButton").addEventListener("click", startButton);

    }

    if (curSite != "index") {
        document.addEventListener("load", function (): void { loadDisplay("fortschritt"); });
        document.getElementById("saveButton").addEventListener("click", saveButton);
        document.getElementById("backButton").addEventListener("click", backButton);
    }
}

//#endregion

//Reloads the Site to ensure generated emlemnt are loaded
let once: boolean = true;
function preloadElements(time: number): void {
    if (once) {
        console.log("Elemnte Preloaden");
        once = false;
        setTimeout(preloadElements, time);
    }
}

async function jayson(): Promise<string> {
    let response: Response = await fetch("data.json");
    let json: JSON = await response.json();
    let jsonString: string = JSON.stringify(json);
    return jsonString;
}

function siteHandle(): void {
    let currentSite: HTMLElement = document.getElementById("Headline");
    if (currentSite.innerHTML == "Your Icecream Generator: Start/End") { curSiteNumber = 4; curSite = "index"; }
    if (currentSite.innerHTML == "Your Icecream Generator: Halter") { curSiteNumber = 0; curSite = "Halter"; }
    if (currentSite.innerHTML == "Your Icecream Generator: Eis") { curSiteNumber = 1; curSite = "Eis"; }
    if (currentSite.innerHTML == "Your Icecream Generator: Belag") { curSiteNumber = 2; curSite = "Belag"; }
    if (currentSite.innerHTML == "Your Icecream Generator: Extra") { curSiteNumber = 3; curSite = "Waffel"; }
    return null;
}

function siteVisited(): boolean {
    let pWaf: Parsing = JSON.parse(localStorage.getItem("Waffel"));
    let pTop: Parsing = JSON.parse(localStorage.getItem("Belag"));
    let pIce: Parsing = JSON.parse(localStorage.getItem("Eis"));
    let pHol: Parsing = JSON.parse(localStorage.getItem("Halter"));

    if (pIce == null && pHol == null && pWaf == null && pTop == null) {
        return false;
    } else {
        return true;
    }
}

function visitingIndex(): void {
    let auswahl: HTMLDivElement = document.createElement("div");
    let aHol: HTMLDivElement = document.createElement("div");
    let aIce: HTMLDivElement = document.createElement("div");
    let aTop: HTMLDivElement = document.createElement("div");
    let aWaf: HTMLDivElement = document.createElement("div");

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

function startSite(): void {
    let startButton: HTMLElement = document.getElementById("startButton");
    startButton.style.width = "600px";
    startButton.style.height = "400px";
    startButton.style.margin = "400px 0px 0px 400px";
    startButton.style.fontSize = "190px";
    startButton.innerHTML = "Start";
}
interface ServerMessage {
    error: string;
    message: string;
}


async function getServerMessage(_url: string): Promise<void> {
    let browserCacheData: JSON = JSON.parse(localStorage.getItem("Configuration"));
    let query: URLSearchParams = new URLSearchParams(<any>browserCacheData);
    _url = _url + "?" + query.toString();
    let response: Response = await fetch(_url);
    let message: ServerMessage = await response.json();
    showServerMessage(message);
}

function showServerMessage(_message: ServerMessage): void {
    let messageDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverMessage");
    if (_message.message != undefined) {
        messageDiv.textContent = "Server-Message: " + _message.message;
        messageDiv.style.color = "blue";
    } else if (_message.error != undefined) {
        messageDiv.textContent = "Server-Message: " + _message.error;
        messageDiv.style.color = "red";

    }
}

init();
function init(): void {
    siteHandle();
    eventHandler();
    console.log(curSite);
    divCreate();
    parsingJson();
    setTimeout(listenToSelection, 100);
    listenToSelection();

    if (curSite == "index" && siteVisited() == true) {
        visitingIndex();
        loadDisplay("fortschritt");
        setTimeout(function (): void { loadDisplay("ausgewahlt"); }, 100);
        getServerMessage("https://gis-communication.herokuapp.com/");
    } else if (curSite == "index" && siteVisited() == false) {
        startSite();
    }

}