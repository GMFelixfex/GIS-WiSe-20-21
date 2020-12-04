let hHead: HTMLHeadElement = document.head;
let hBody: HTMLElement = document.body;

let saveWaffel: Waffel[] = [];
let saveTopping: Topping[] = [];
let saveIce: Ice[] = [];
let saveHolder: Holder[] = [];
let selectedParts: number[] = [-1, -1, -1, -1];
let curSite: string = "";

let sendServer: ServerPaket;


class ServerPaket {
    waffel: Waffel;
    belag: Topping;
    eis: Ice;
    halter: Holder;

    constructor(_waffel: Waffel, _belag: Topping, _eis: Ice, _halter: Holder) {
        this.waffel = _waffel;
        this.belag = _belag;
        this.eis = _eis;
        this.halter = _halter;
    }

}

let countw: number = 0;
class Waffel {
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
        let divWaffel: HTMLElement = document.getElementById("divWaffel");
        divWaffel.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generatedWaffel");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveWaffel[countw] = this;
        countw++;
    }


}

let countt: number = 0;
class Topping {
    name: string;
    preis: number;
    stil: string;
    path: string;

    constructor(_name?: string, _preis?: number, _stil?: string, _path?: string) {
        if (_name === undefined) _name = "Namenlos";
        if (_preis === undefined) _preis = 0;
        if (_stil === undefined) _stil = "Topping";
        if (_path === undefined) _path = "../Abgabe2/Media/default.png";
        this.name = _name;
        this.preis = _preis;
        this.stil = _stil;
        this.path = _path;

    }
    public flexCreate(): void {
        let newElemnt: HTMLDivElement = document.createElement("div");
        let divTopping: HTMLElement = document.getElementById("divTopping");
        divTopping.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generatedTopping");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveTopping[countt] = this;
        countt++;
    }


}

let counti: number = 0;
class Ice {
    name: string;
    preis: number;
    stil: string;
    path: string;



    constructor(_name?: string, _preis?: number, _stil?: string, _path?: string) {
        if (_name === undefined) _name = "Namenlos";
        if (_preis === undefined) _preis = 0;
        if (_stil === undefined) _stil = "Ice";
        if (_path === undefined) _path = "../Abgabe2/Media/default.png";
        this.name = _name;
        this.preis = _preis;
        this.stil = _stil;
        this.path = _path;



    }
    public flexCreate(): void {
        let newElemnt: HTMLDivElement = document.createElement("div");
        let divIce: HTMLElement = document.getElementById("divIce");
        divIce.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generatedIce");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveIce[counti] = this;
        counti++;
    }


}

let counth: number = 0;
class Holder {
    name: string;
    preis: number;
    stil: string;
    path: string;


    constructor(_name?: string, _preis?: number, _stil?: string, _path?: string) {
        if (_name === undefined) _name = "Namenlos";
        if (_preis === undefined) _preis = 0;
        if (_stil === undefined) _stil = "Holder";
        if (_path === undefined) _path = "../Abgabe2/Media/default.png";
        this.name = _name;
        this.preis = _preis;
        this.stil = _stil;
        this.path = _path;


    }
    public flexCreate(): void {
        let newElemnt: HTMLDivElement = document.createElement("div");
        let divHolder: HTMLElement = document.getElementById("divHolder");
        divHolder.appendChild(newElemnt);
        newElemnt.setAttribute("class", "generatedHolder");
        newElemnt.innerHTML = "<img src = " + this.path + "></img>" + this.name + "<br>" + " Preis: " + this.preis + "€";
        saveHolder[counth] = this;
        counth++;

    }

}

//Parsing and Creation of Elements/Selection
async function parsingJson(): Promise<void> {
    if (siteHandle() != "index") { loadDisplay("fortschritt"); }

    let pjson: Parsing[] = JSON.parse(await jayson());
    let i: number = 0;
    let j: number = 0;
    let k: number = 0;
    let l: number = 0;
    for (let key in pjson) {

        if (pjson[key].stil == "Waffel" && (siteHandle() == "Waffel")) {
            let obj: Waffel = new Waffel(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveWaffel[i] = obj;
            i++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Topping" && (siteHandle() == "Belag")) {
            let obj: Topping = new Topping(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveTopping[j] = obj;
            j++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Ice" && (siteHandle() == "Eis")) {
            let obj: Ice = new Ice(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveIce[k] = obj;
            k++;
            obj.flexCreate();
        }
        if (pjson[key].stil == "Holder" && (siteHandle() == "Halter")) {
            let obj: Holder = new Holder(pjson[key].name, pjson[key].preis, pjson[key].stil, pjson[key].path);
            saveHolder[l] = obj;
            l++;
            obj.flexCreate();
        }
    }
}

//#region Creation the Selection flexbox
function defaultDivCreation(): void {
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

function divCreate(_type: string): void {
    let partsDiv: HTMLElement = document.getElementById("PartsDiv");
    let newDiv: HTMLDivElement = document.createElement("div");
    partsDiv.appendChild(newDiv);
    newDiv.setAttribute("id", "div" + _type);
}
//#endregion

//#region selection handeling

//alles mit id=generated, sodass mann nur einmal laden muss (kürzen)
function listenToSelection(): void {
    let arrHolder: HTMLCollectionOf<Element> = document.getElementsByClassName("generatedHolder");
    let arrIce: HTMLCollectionOf<Element> = document.getElementsByClassName("generatedIce");
    let arrTopping: HTMLCollectionOf<Element> = document.getElementsByClassName("generatedTopping");
    let arrWaffel: HTMLCollectionOf<Element> = document.getElementsByClassName("generatedWaffel");

    for (let i: number = 0; i < arrHolder.length; i++) {
        arrHolder[i].addEventListener("click", function (): void { selectHolder(i, arrHolder); });
    }
    for (let i: number = 0; i < arrIce.length; i++) {
        arrIce[i].addEventListener("click", function (): void { selectIce(i, arrIce); });
    }
    for (let i: number = 0; i < arrTopping.length; i++) {
        arrTopping[i].addEventListener("click", function (): void { selectTopping(i, arrTopping); });
    }
    for (let i: number = 0; i < arrWaffel.length; i++) {
        arrWaffel[i].addEventListener("click", function (): void { selectWaffel(i, arrWaffel); });
    }
}


function selectHolder(k: number, arr: HTMLCollectionOf<Element>): void {
    for (let i: number = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedHolder");
    selectedParts[0] = k;
}
function selectIce(k: number, arr: HTMLCollectionOf<Element>): void {
    for (let i: number = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedIce");
    selectedParts[1] = k;
}
function selectTopping(k: number, arr: HTMLCollectionOf<Element>): void {
    for (let i: number = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedTopping");
    selectedParts[2] = k;
}
function selectWaffel(k: number, arr: HTMLCollectionOf<Element>): void {
    for (let i: number = 0; i < arr.length; i++) {
        arr[i].setAttribute("id", "");
    }
    arr[k].setAttribute("id", "selectedWaffle");
    selectedParts[3] = k;

}

//#endregion


//#region displays the Current Configuration and Endselection

interface Parsing {
    name: string;
    preis: number;
    stil: string;
    path: string;
}


function loadDisplay(_ausw: string): void {
    let pWaf: Parsing = JSON.parse(localStorage.getItem("Waffel"));
    let pTop: Parsing = JSON.parse(localStorage.getItem("Belag"));
    let pIce: Parsing = JSON.parse(localStorage.getItem("Eis"));
    let pHol: Parsing = JSON.parse(localStorage.getItem("Halter"));
    let myWaffel: Waffel;
    let myTopping: Topping;
    let myIce: Ice;
    let myHolder: Holder;
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
        let sentJson: string = JSON.stringify(sendServer);
        localStorage.setItem("Configuration", sentJson);
        displayProduct(myWaffel, myTopping, myIce, myHolder);
    }
}

let needUpdate: number[] = [];
function displayRes(_waf: Waffel, _top: Topping, _ice: Ice, _hol: Holder, _ausw: string): void {
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
            if (siteHandle() != "index") { ausWaffel.style.marginTop = "-300px"; }
        }
        if (_top != undefined) {
            ausTopping.innerHTML = "<img src = " + _top.path + "></img>";
            if (siteHandle() != "index") { ausTopping.style.marginTop = "-300px"; }
        }
        if (_ice != undefined) {
            ausIce.innerHTML = "<img src = " + _ice.path + "></img>";
            if (siteHandle() != "index") { ausIce.style.marginTop = "-300px"; }
        }
        if (_hol != undefined) {
            ausHolder.innerHTML = "<img src = " + _hol.path + "></img>";
            if (siteHandle() != "index") { ausHolder.style.marginTop = "-300px"; }
        }
    }



}

function displayProduct(_waf: Waffel, _top: Topping, _ice: Ice, _hol: Holder): void {
    let produktDiv: HTMLElement = document.getElementById("Produkt");
    produktDiv.innerHTML = "<b><u>Ihr Eis: </u></b><br>";
    if (_ice == undefined && _hol == undefined && _waf == undefined && _top == undefined) {
        produktDiv.innerHTML = "";
    } else {
        let price: number = 0;
        if (_ice != undefined) {
            produktDiv.innerHTML += _ice.name + "-Eis";
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
    if ((siteHandle() == "Waffel") && selectedParts[3] != -1) {
        let obj: Waffel = saveWaffel[selectedParts[3]];
        let myJSON: string = JSON.stringify(obj);
        localStorage.setItem("Waffel", myJSON);
        window.open("index.html", "_self");
    }
    if ((siteHandle() == "Belag") && selectedParts[2] != -1) {
        let obj2: Topping = saveTopping[selectedParts[2]];
        let myJSON2: string = JSON.stringify(obj2);
        localStorage.setItem("Belag", myJSON2);
        window.open("iwaffel.html", "_self");
    }
    if ((siteHandle() == "Eis") && selectedParts[1] != -1) {
        let obj3: Ice = saveIce[selectedParts[1]];
        let myJSON3: string = JSON.stringify(obj3);
        localStorage.setItem("Eis", myJSON3);
        window.open("ibelag.html", "_self");
    }
    if ((siteHandle() == "Halter") && selectedParts[0] != -1) {
        let obj4: Holder = saveHolder[selectedParts[0]];
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
    document.addEventListener("load", function (): void { loadDisplay("fortschritt"); });
    document.getElementById("saveButton").addEventListener("click", saveButton);
    document.getElementById("backButton").addEventListener("click", backButton);
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

function siteHandle(): string {
    let currentSite: HTMLElement = document.getElementById("Headline");
    if (currentSite.innerHTML == "Your Icecream Generator: Start/End") { return "index"; }
    if (currentSite.innerHTML == "Your Icecream Generator: Halter") { return "Halter"; }
    if (currentSite.innerHTML == "Your Icecream Generator: Eis") { return "Eis"; }
    if (currentSite.innerHTML == "Your Icecream Generator: Belag") { return "Belag"; }
    if (currentSite.innerHTML == "Your Icecream Generator: Extra") { return "Waffel"; }
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
    defaultDivCreation();
    parsingJson();
    setTimeout(listenToSelection, 100);
    listenToSelection();

    if (siteHandle() == "index" && siteVisited() == true) {
        visitingIndex();
        loadDisplay("fortschritt");
        setTimeout(function (): void { loadDisplay("ausgewahlt"); }, 100);
        getServerMessage("https://gis-communication.herokuapp.com/");
    } else if (siteHandle() == "index" && siteVisited() == false) {
        startSite();
    }

}