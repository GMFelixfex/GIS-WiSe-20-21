"use strict";
/*
console.log("init");

let numArray: number[] = [23, 45, 30, 20, 39, 49, 60, 78, 11, 21, 9, 1, 13, -1];

function min(array: number[]): number {
    let minimum: number = array[1];
    for (let i: number = 0; i < array.length; i++) {
        if (array[i] < minimum) {
            minimum = array[i];
        }
    }

    return minimum;

}
console.log(min(numArray));

function isEven(num: number): boolean {
    if (num < 0) {
        num = -num;
    }
    if (num == 0) {
        return true;
    }
    else if (num == 1) {
        return false;
    }
    else {
        return (isEven(num - 2));

    }
}
console.log(isEven(75));


interface Studies {
    name: string;
    age: number;
    email: string;
    mtrNum: number;
}

let s1: Studies = { name: "Micha", age: 23, email: "loldasgeht@gmx.de", mtrNum: 234432 };
let s2: Studies = { name: "Megan", age: 21, email: "hasuper@gmx.de", mtrNum: 696969 };
let s3: Studies = { name: "Mini", age: 25, email: "niemals@gmx.de", mtrNum: 420420 };

let student: Studies[] = [s1, s2, s3];

student.push({ name: "Maxi", age: 19, email: "klein@gmx.de", mtrNum: 123456 });


function showInfo(auswahl: number, stud: number): string {
    if (auswahl == 1) {
        return "Name: " + student[stud].name;
    }
    if (auswahl == 2) {
        return "Age: " + student[stud].age.toString();
    }
    if (auswahl == 3) {
        return "Email: " + student[stud].email;
    }
    if (auswahl == 4) {
        return "Martrikelnummer: " + student[stud].mtrNum.toString();
    }
    if (auswahl == 5) {
        return "Name: " + student[stud].name + "\n" + "Age: " + student[stud].age.toString() + "\n" + "Email: " + student[stud].email + "\n" + "Martrikelnummer: " + student[stud].mtrNum.toString();
    }
    return "nah";
}
for (let i: number = 0; i < 4; i++) {
    console.log(showInfo(2, i));
}


class Studies {
    name: string;
    age: number;
    email: string;
    mtrNum: number;

    constructor(_name: string, _age: number, _email: string, _mtrNum: number) {
        this.name = _name;
        this.age = _age;
        this.email = _email;
        this.mtrNum = _mtrNum;
    }

    public showInfo(auswahl: number): string {
        if (auswahl == 1) {
            return "Name: " + this.name;
        }
        if (auswahl == 2) {
            return "Age: " + this.age.toString();
        }
        if (auswahl == 3) {
            return "Email: " + this.email;
        }
        if (auswahl == 4) {
            return "Martrikelnummer: " + this.mtrNum.toString();
        }
        if (auswahl == 5) {
            return "Name: " + this.name + "\n" + "Age: " + this.age.toString() + "\n" + "Email: " + this.email + "\n" + "Martrikelnummer: " + this.mtrNum.toString();
        }
        return "nah";
    }

}
let s1: Studies = new Studies("Micha", 23, "loldasgeht@gmx.de", 234432);
let s2: Studies = new Studies("Megan", 21, "hasuper@gmx.de", 696969);
let s3: Studies = new Studies("Mini", 25, "niemals@gmx.de", 420420);
let student: Studies[] = [s1, s2, s3];

for (let i: number = 0; i < student.length; i++) {
    console.log(student[i].showInfo(5));
}


let numArray: number[] = [23, 45, 30, 20, 39, 49, 60, 78, 11, 21, 9, 1, 13, -1];
let numArray2: number[] = [23, 45, 30, 20, 39, 49, 60, 78, 11, 21, 9, 1, 13, -1];
let numArray3: number[] = [23, 45, 30, 20, 39, 49, 60, 78, 11, 21, 9, 1, 13, -1];
let numArray4: number[] = [23, 45, 30, 20, 39, 49, 60, 78, 11, 21, 9, 1, 13, -1];

function backwards(array: number[]): number[] {
    let k: number = 0;
    let backwardsArray: number[] = [];
    for (let i: number = (array.length - 1); i >= 0; i--) {
        backwardsArray[k] = array[i];
        k++;
    }
    return backwardsArray;
}

console.log(backwards(numArray));


function join(array1: number[], array2: number[]): number[] {
    let newArray: number[] = [];
    for (let i: number = 0; i < array1.length; i++) {
        newArray[i] = array1[i];

    }
    for (let i: number = 0; i < array1.length; i++) {
        newArray[i + array1.length] = array2[i];
    }
    return newArray;
}
console.log(join(numArray, numArray2));

function split(array: number[], k: number, j: number): number[] {
    let newArray: number[] = [];
    if (k > array.length) {
        k = array.length;
    }
    if (j > array.length) {
        j = array.length;
    }
    if (k < 0) {
        k = 0;
    }
    if (j < 0) {
        j = 0;
    }
    for (let i: number = k; i < j; i++) {
        newArray[i - k] = array[i];
    }
    return newArray;
}




let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myFirstCanvas");
let context: CanvasRenderingContext2D = canvas.getContext("2d");
class Rechtecke {
    posX: number;
    posY: number;
    width: number;
    height: number;
    color: string;


    constructor(_posX?: number, _posY?: number, _width?: number, _height?: number, _color?: string) {
        if (_posX === undefined) _posX = Math.random() * 500;
        if (_posY === undefined) _posY = Math.random() * 500;
        if (_width === undefined) _width = Math.random() * 500;
        if (_height === undefined) _height = Math.random() * 500;
        if (_color === undefined) _color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, "0");
        this.posX = _posX;
        this.posY = _posY;
        this.width = _width;
        this.height = _height;
        this.color = _color;


    }

    public drawRect(): void {
        context.fillStyle = this.color;
        context.fillRect(this.posX, this.posY, this.width, this.height);
    }

}

let recta: Rechtecke[] = [];
randomRect();
function randomRect(): void {
    for (let i: number = 0; i < 5; i++) {
        recta[i] = new Rechtecke;
    }
    for (let i: number = 0; i < 5; i++) {
        recta[i].drawRect();
    }
    setTimeout(randomRect, 1000);
}



*/
/*
context.strokeStyle = "red";

context.lineWidth = 6;

context.strokeRect(75, 140, 150, 110);

context.fillRect(130, 190, 40, 60);

context.beginPath();
context.moveTo(50, 140);
context.quadraticCurveTo(0.1, 100, 150, 60);
context.lineTo(250, 140);
context.closePath();
context.stroke();
*/ 
//# sourceMappingURL=script.js.map