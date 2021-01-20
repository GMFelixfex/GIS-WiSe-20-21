import * as Http from "http";
import * as url from "url";
import * as Mongo from "mongodb";

export namespace PServer {

    let students: Mongo.Collection;

    class Person {
        vorname: string;
        nachname: string;
        martrikelnummer: string;

        constructor(_fname: string, _lname: string, _mtrNr: string) {
            this.vorname = _fname;
            this.nachname = _lname;
            this.martrikelnummer = _mtrNr;
        }
    }
    
    interface ParsingUser {
        id: string;
        vorname: string;
        nachname: string;
        martikelNr: string;
    }


    let port: number = Number(process.env.PORT);
    if (!port) {
        port = 8100;

    }
    //let dbURL: string = "mongodb://127.0.0.1:27017";
    let dbURL: string = "mongodb+srv://Felixfex:!Fex1341@forgisgm.koewa.mongodb.net/<dbname>?retryWrites=true&w=majority";
    console.log(process.argv.slice(2));
    if (process.argv.slice(2)[0] == "local") {
        dbURL = "mongodb://127.0.0.1:27017";
    }

    init();
    async function init(): Promise<void> {

        connectToDatabase(dbURL);
        startServer(port);

    }



    function startServer(_port: number | string): void {
        console.log("Starting server" + _port);
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);

    }


    async function connectToDatabase(_url: string): Promise<Mongo.Db> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        students = mongoClient.db("Test").collection("Students");
        console.log("Connection Established", students != undefined);
        return mongoClient.db("Test");
    }

    function handleListen(): void {
        console.log("Listening");
    }

    function retriveCollection(): Mongo.Cursor {
        let result: Mongo.Cursor = students.find();
        return result;
    }


   



    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        let collCursor: Mongo.Cursor = retriveCollection();
        let findingsArray: ParsingUser[] = await collCursor.toArray();
        //console.log(findingsArray);

        let fun: string = _request.url;
        let fun2 = url.parse(fun, true);
        let fun3 = fun2.query;
        let persi: Person;

        console.log(findingsArray.length);
        console.log(findingsArray);
        console.log(findingsArray[0]);

        let sendstring: string[] = [];
        for (let i: number = 0; i < findingsArray.length; i++) {
            sendstring[i] = findingsArray[i].vorname + " " + findingsArray[i].nachname;
            
        }
        

        if (fun3.fname != undefined || fun3.lname != undefined || fun3.mtrNr != undefined) {
            persi = new Person(<string>fun3.fname, <string>fun3.lname, <string>fun3.mtrNr);
            if (fun3.delete != undefined) {
                students.deleteOne(persi);
                console.log("deleted" + persi);
            } else {
                students.insertOne(persi);
                console.log("added" + persi);
            }
        }

        if (fun2.pathname == "/json") {
            console.log("lol is ein json");
            _response.write(JSON.stringify(persi));
            _response.end();

        } else if (fun2.pathname == "/html") {
            _response.write(persi.vorname + " " + persi.nachname + " " + persi.martrikelnummer);
            _response.end();
        } else if (fun2.pathname == "/getDB") {
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
}

//node PServer.js

//doc = {name: "Poenitzsch", firstname: "Felix", registration: "265132"}

//MongoDB/bin/mongod --dbpath  K:\HFU\Gis\GIS-WiSe-20-21\Test\Database

//mongodb+srv://Felixfex:<password>@forgisgm.koewa.mongodb.net/<dbname>?retryWrites=true&w=majority

//https://mongodbnetbrowser.herokuapp.com/forgisgm.koewa.mongodb.net
//https://mongodbnetbrowser.herokuapp.com/Felixfex:!Fex1341@forgisgm.koewa.mongodb.net

//https://mongodbnetbrowser.herokuapp.com/?u=Felixfex&p=!Fex1341&a=forgisgm.koewa.mongodb.net&n=Test&c=Students