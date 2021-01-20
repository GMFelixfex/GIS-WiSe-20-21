namespace Aufgabe2_1 {

function a2(): void {
    let i: number = 2;

    do {
        console.log(i);
        i = i - 1;
    } while ( i > 0);
}

a2();



let x: string = "Hallo";
console.log(x);
func1(x);
console.log(x);
func2();
console.log(x);
func3();
console.log(x);

function func1(y: string): void { 
    y = "Bla";
    console.log(y);
}

function func2(): void {
    let x: string = "Blubb";
    console.log(x);
}

function func3(): void {
    x = "Test";
}



function multiply(why: number, ex: number): number {
    return why * ex;
}

console.log(multiply(10, 14));

function max(why: number, ex: number): number {
    if (why >= ex) {
        return why;
    } else {
        return ex;
    }
}

console.log(max(10, 14));

let alles: number = 0;
let hch: number = 0;

do {
    alles = alles + hch;
    hch += 1;
} while ( hch < 101);

console.log(alles);



for (let i: number = 0; i < 11; i++) {
    console.log(Math.random() * 100);
    
}


function fakultät(why: number): number {
    let fact: number =  1;
    
    for (let i: number = 1; i <= why; i++) {
        fact = fact * i;
    }
    return fact;
}
console.log(fakultät(10));

leapyear();
function leapyear(): void {
    
    for (let i: number = 1900; i <= 2021; i++) {
        if (i % 4 == 0  && (i % 100 != 0 || i % 400 == 0)) {
            console.log(i);
        }
    }

}

let hash: string = "";
for (let i: number = 0; hash.length < 7; i++) {
    hash = hash + "#";
    console.log(hash);
    
}

bis100();
function bis100(): void {
    for (let i: number = 1; i < 101; i++) {
        let call: string = "";
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

function schach(höhe: number, breite: number): string {
    let call: string = "";
    let toggle: boolean = false;
    for (let i: number = 0; i <= höhe * breite; i++) {
        if (toggle) {
            call = call + "#";
        } else {
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

}