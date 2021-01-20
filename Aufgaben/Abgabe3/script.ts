
namespace Abgabe3 {
    
    function getPage(): string {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }

    
    let subButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submitData");
    subButton.addEventListener("click", setValue);
    
    
    function setValue(): void {
        let fname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
        let lname: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
        let adrr: HTMLInputElement = <HTMLInputElement>document.getElementById("adrr");
        let email: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
        let password: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
        console.log("data");
        let page: string = getPage();

        let missingBool: boolean = false;
        
        //checkt die verschiedenen eingabefelder und makiert sie fals etwas fehlt
        if (page != "loaduser.html") {
            if (page == "index.html") {
                if (fname.value == "") {
                    fname.style.border = "1px solid rgb(255, 60, 60)";
                    fname.style.backgroundColor = "rgb(255, 214, 214)";
                    missingBool = true;
                }  else {
                    fname.style.border = "1px solid #ccc";
                    fname.style.backgroundColor = "lightgrey";
                }
                if (lname.value == "") {
                    lname.style.border = "1px solid rgb(255, 60, 60)";
                    lname.style.backgroundColor = "rgb(255, 214, 214)";
                    missingBool = true;
                } else {
                    lname.style.border = "1px solid #ccc";
                    lname.style.backgroundColor = "lightgrey";
                }
                if (adrr.value == "") {
                    adrr.style.border = "1px solid rgb(255, 60, 60)";
                    adrr.style.backgroundColor = "rgb(255, 214, 214)";
                    missingBool = true;
                } else {
                    adrr.style.border = "1px solid #ccc";
                    adrr.style.backgroundColor = "lightgrey";
                }
            }
            if (email.value == "") {
                email.style.border = "1px solid rgb(255, 60, 60)";
                email.style.backgroundColor = "rgb(255, 214, 214)";
                missingBool = true;
            } else {
                email.style.border = "1px solid #ccc";
                email.style.backgroundColor = "lightgrey";
            }
            if (password.value == "") {
                password.style.border = "1px solid rgb(255, 60, 60)";
                password.style.backgroundColor = "rgb(255, 214, 214)";
                missingBool = true;
            } else {
                password.style.border = "1px solid #ccc";
                password.style.backgroundColor = "lightgrey";
            }
        }
        
        //frägt ab ob alle daten vorhanden sind wenn nicht gibt es einen Text aus 
        let bod: HTMLElement = document.getElementById("ErrorText");
        if (missingBool == false) {
            let formData: FormData = new FormData(document.forms[0]);
            bod.innerHTML = "";
            bod.style.width = "";
            getSMessage(formData);
        } else {
            bod.innerHTML = "<p> Eingaben vergessen! Bitte alles rot makierte eintragen</p>";
            bod.style.width = "50%";
        }
        
    }


    async function getSMessage(_formdata: FormData): Promise<void> {
        let path: string = getPage();
        let url: string = "https://gisfelixfex.herokuapp.com/" + path;
        let query: URLSearchParams = new URLSearchParams(<any>_formdata);
        console.log(query);
        url = url + "?" + query.toString();
        console.log(url);
        let response: Response = await fetch(url);
        let message: string = await response.text();
        console.log(message);
        showServerMessage2(message);

    }

    function showServerMessage2(_message: string): void {
        let bod: HTMLElement = document.getElementById("ErrorText");
        bod.innerHTML = _message;
        bod.style.width = "50%";
    }

}












