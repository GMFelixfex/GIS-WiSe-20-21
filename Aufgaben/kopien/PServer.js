"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PServer = void 0;
const Http = require("http");
const url = require("url");
const Mongo = require("mongodb");
var PServer;
(function (PServer) {
    let students;
    class Person {
        constructor(_fname, _lname, _mtrNr) {
            this.vorname = _fname;
            this.nachname = _lname;
            this.martrikelnummer = _mtrNr;
        }
    }
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    //let dbURL: string = "mongodb://127.0.0.1:27017";
    let dbURL = "mongodb+srv://Felixfex:!Fex1341@forgisgm.koewa.mongodb.net/<dbname>?retryWrites=true&w=majority";
    console.log(process.argv.slice(2));
    if (process.argv.slice(2)[0] == "local") {
        dbURL = "mongodb://127.0.0.1:27017";
    }
    init();
    async function init() {
        connectToDatabase(dbURL);
        startServer(port);
    }
    function startServer(_port) {
        console.log("Starting server" + _port);
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        students = mongoClient.db("Test").collection("Students");
        console.log("Connection Established", students != undefined);
        return mongoClient.db("Test");
    }
    function handleListen() {
        console.log("Listening");
    }
    function retriveCollection() {
        let result = students.find();
        return result;
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let collCursor = retriveCollection();
        let findingsArray = await collCursor.toArray();
        //console.log(findingsArray);
        let fun = _request.url;
        let fun2 = url.parse(fun, true);
        let fun3 = fun2.query;
        let persi;
        console.log(findingsArray.length);
        console.log(findingsArray);
        console.log(findingsArray[0]);
        let sendstring = [];
        for (let i = 0; i < findingsArray.length; i++) {
            sendstring[i] = findingsArray[i].vorname + " " + findingsArray[i].nachname;
        }
        if (fun3.fname != undefined || fun3.lname != undefined || fun3.mtrNr != undefined) {
            persi = new Person(fun3.fname, fun3.lname, fun3.mtrNr);
            if (fun3.delete != undefined) {
                students.deleteOne(persi);
                console.log("deleted" + persi);
            }
            else {
                students.insertOne(persi);
                console.log("added" + persi);
            }
        }
        if (fun2.pathname == "/json") {
            console.log("lol is ein json");
            _response.write(JSON.stringify(persi));
            _response.end();
        }
        else if (fun2.pathname == "/html") {
            _response.write(persi.vorname + " " + persi.nachname + " " + persi.martrikelnummer);
            _response.end();
        }
        else if (fun2.pathname == "/getDB") {
            _response.write(sendstring);
            _response.end();
        }
    }
    /*let adresse: string = "http://localhost:8080/default.htm?jahr=2017&monat=february";
    //Adresse parsen (umwandeln):
    let q = url.parse(adresse, true);

    //Die parse Methode gibt ein Objekt zurück, dass die URL Eigenschaften enthält. So können die fest definierten Eigenschaften einer URL ausgelesen werden:
    console.log(q.host);
    console.log(q.port);
    console.log(q.search);
    console.log(q.hostname);
    console.log(q.path);
    console.log(q.pathname);
    console.log(q.auth);

    //Die query Eigenschaft gibt ein Ojekt zurück, dass alle query-string Parameter als Eigenschaften besitzt. So können beliebig gesendete Attribute ausgelesen werden:
    var qdata = q.query;
    console.log(qdata.monat);*/
})(PServer = exports.PServer || (exports.PServer = {}));
//node PServer.js
//doc = {name: "Poenitzsch", firstname: "Felix", registration: "265132"}
//MongoDB/bin/mongod --dbpath  K:\HFU\Gis\GIS-WiSe-20-21\Test\Database
//mongodb+srv://Felixfex:<password>@forgisgm.koewa.mongodb.net/<dbname>?retryWrites=true&w=majority
//https://mongodbnetbrowser.herokuapp.com/forgisgm.koewa.mongodb.net
//https://mongodbnetbrowser.herokuapp.com/Felixfex:!Fex1341@forgisgm.koewa.mongodb.net
//https://mongodbnetbrowser.herokuapp.com/?u=Felixfex&p=!Fex1341&a=forgisgm.koewa.mongodb.net&n=Test&c=Students
//# sourceMappingURL=PServer.js.map