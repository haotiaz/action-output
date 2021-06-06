var index=1;
let scrapeText = document.getElementById("scrapeText");
let scrapeURL = document.getElementById("scrapeURL");
let scrapeLink = document.getElementById("scrapeLink");
let outputTable = document.getElementById("output");
var selecting=false;

function waitForSelecting(){
    selecting=true;
    let buttons=document.getElementsByTagName('button');
    var i;
    for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled=true;
    }
    let reminder = document.getElementById('reminder');
    reminder.style.visibility="visible";
}

function finishSelecting() {
    selecting = false;
    let buttons = document.getElementsByTagName('button');
    var i;
    for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    let reminder = document.getElementById('reminder');
    reminder.style.visibility = "hidden";
}

function addOutput(output){
    var row = outputTable.insertRow(index);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = index;
    cell2.innerHTML = output;

    index+=1;
}

function clickURL() {
    chrome.runtime.sendMessage({'action': 'scrape-url'}, (response) => {
        addOutput(response);
    });
}

function clickText() {
    chrome.runtime.sendMessage({ 'action': 'scrape-text'}, (response) => {
        //meaningless response
    });
    waitForSelecting();
}

function clickLink(){
    chrome.runtime.sendMessage({ 'action': 'scrape-link' }, (response) => {
        //meaningless response
    });
    waitForSelecting();
}


scrapeURL.addEventListener("click", clickURL);
scrapeText.addEventListener("click", clickText);
scrapeLink.addEventListener('click', clickLink);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "output") {
            addOutput(request.output);
            finishSelecting();
        }

    }
);


