"use strict";
var Aufgabe2_1;
(function (Aufgabe2_1) {
    function a2() {
        let i = 2;
        do {
            console.log(i);
            i = i - 1;
        } while (i > 0);
    }
    a2();
    let x = "Hallo";
    console.log(x);
    func1(x);
    console.log(x);
    func2();
    console.log(x);
    func3();
    console.log(x);
    function func1(y) {
        y = "Bla";
        console.log(y);
    }
    function func2() {
        let x = "Blubb";
        console.log(x);
    }
    function func3() {
        x = "Test";
    }
    function multiply(why, ex) {
        return why * ex;
    }
    console.log(multiply(10, 14));
    function max(why, ex) {
        if (why >= ex) {
            return why;
        }
        else {
            return ex;
        }
    }
    console.log(max(10, 14));
    let alles = 0;
    let hch = 0;
    do {
        alles = alles + hch;
        hch += 1;
    } while (hch < 101);
    console.log(alles);
    for (let i = 0; i < 11; i++) {
        console.log(Math.random() * 100);
    }
    function fakultät(why) {
        let fact = 1;
        for (let i = 1; i <= why; i++) {
            fact = fact * i;
        }
        return fact;
    }
    console.log(fakultät(10));
    leapyear();
    function leapyear() {
        for (let i = 1900; i <= 2021; i++) {
            if (i % 4 == 0 && (i % 100 != 0 || i % 400 == 0)) {
                console.log(i);
            }
        }
    }
    let hash = "";
    for (let i = 0; hash.length < 7; i++) {
        hash = hash + "#";
        console.log(hash);
    }
    bis100();
    function bis100() {
        for (let i = 1; i < 101; i++) {
            let call = "";
            if (i % 3 == 0) {
                call = call + "Fizz";
            }
            if (i % 5 == 0) {
                call = call + "Buzz";
            }
            if (call.length == 0) {
                call = i.toString();
            }
            console.log(call);
        }
    }
    function schach(höhe, breite) {
        let call = "";
        let toggle = false;
        for (let i = 0; i <= höhe * breite; i++) {
            if (toggle) {
                call = call + "#";
            }
            else {
                call = call + " ";
            }
            if (i % breite == 0) {
                call = call + "\n";
                toggle = !toggle;
            }
            toggle = !toggle;
        }
        return call;
    }
    console.log(schach(8, 20));
})(Aufgabe2_1 || (Aufgabe2_1 = {}));
//# sourceMappingURL=script.js.map