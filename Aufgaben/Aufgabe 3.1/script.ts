
namespace Aufgabe3_1 {
    /*
    function getSubpage(): string {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }
    */
    
    let subButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submitData");
    subButton.addEventListener("click", setValue);
    
    function setValue(): void {
        let fname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
        let lname: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
        let mtrNr: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
        let checkboxJson: HTMLInputElement = <HTMLInputElement>document.getElementById("doJson");
        let doJson: boolean = checkboxJson.checked;

        fname.setAttribute("value", fname.value);
        lname.setAttribute("value", lname.value);
        mtrNr.setAttribute("value", mtrNr.value);

        let formData: FormData = new FormData(document.forms[0]);
        console.log(formData);
        getSMessage(formData, doJson);
    }


    async function getSMessage(_formdata: FormData, _doJson: Boolean): Promise<void> {
        let path: string = "html";
        if (_doJson) {
            path = "json";
        }
        let url: string = "http://localhost:8100/" + path;
        let query: URLSearchParams = new URLSearchParams(<any>_formdata);
        url = url + "?" + query.toString();
        console.log(url);
        let response: Response = await fetch(url);
        let message: string = await response.json();
        console.log(message);
        showServerMessage2(message);

    }

    function showServerMessage2(_message: string): void {
        let messageDiv: HTMLDivElement = document.createElement("div");
        let bod: HTMLElement = document.getElementById("bod");
        messageDiv.innerHTML = "" + _message;
        bod.appendChild(messageDiv);
    }

}












