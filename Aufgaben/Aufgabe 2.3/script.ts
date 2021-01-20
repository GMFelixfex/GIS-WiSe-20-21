
namespace Aufgabe2_3 {
/*
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




class Rechtecke {
    posX: number;
    posY: number;
    width: number;
    height: number;
    color: string;


    constructor(_posX?: number, _posY?: number, _width?: number, _height?: number, _color?: string) {
        if (_posX === undefined) _posX = Math.round(Math.random() * 500);
        if (_posY === undefined) _posY = Math.round(Math.random() * 500);
        if (_width === undefined) _width = Math.round(Math.random() * 500);
        if (_height === undefined) _height = Math.round(Math.random() * 500);
        if (_color === undefined) _color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
        this.posX = _posX;
        this.posY = _posY;
        this.width = _width;
        this.height = _height;
        this.color = _color;


    }
    public drawRect(): void {
        let newElemnt: HTMLDivElement = document.createElement("div");
        let canvi: HTMLElement = document.getElementById("canvi");
        canvi.appendChild(newElemnt);
        newElemnt.setAttribute("style", "position: absolute" + ";background-color:" + this.color + ";height:" + this.height + "px;width:" + this.width + "px;margin: " + this.posY + "px 0" + "px 0px " + this.posX + "px");
        newElemnt.setAttribute("class", "generated");


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

function drawRectDiv(_posX?: number, _posY?: number, _width?: number, _height?: number, _color?: string): void {
    let recta2: Rechtecke = new Rechtecke(_posX,  _posY, _width, _height, _color);
    recta2.drawRect();
}
function resetAll(): void {
    const myNode: HTMLElement = document.getElementById("canvi");
    myNode.innerHTML = "";
}




document.querySelector("h1").innerHTML = "Mein übi";
document.querySelector("h1").setAttribute("style", "margin: 100px");

*/
}






