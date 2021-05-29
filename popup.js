var index=1;
let scrapeText = document.getElementById("scrapeText");
let scrapeURL = document.getElementById("scrapeURL");
let outputTable = document.getElementById("output");

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
    chrome.runtime.sendMessage('scrape-url', (response) => {
        addOutput(response);
    });
}

function clickText() {
    chrome.runtime.sendMessage('scrape-text', (response) => {
        addOutput(response);
    });
}

scrapeURL.addEventListener("click", clickURL);
scrapeText.addEventListener("click", clickText);


