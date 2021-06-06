var scrapeWindowId;
let queryOptions = { active: true, windowId: scrapeWindowId };
var outputs = [];


chrome.browserAction.onClicked.addListener(function(tab){
    scrapeWindowId = tab.windowId;
    
    chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        height: 500,
        width: 750
    },
    function (win) {
        // win represents the Window object from windows API
        // Do something after opening
    })
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'scrape-url') {
        chrome.tabs.query(queryOptions, function ([tab]) {
            outputs.push(tab.url);
            sendResponse(tab.url);
        })
    }
    else if(message.action === 'scrape-text'){
        chrome.tabs.query(queryOptions, function ([tab]) {
            chrome.tabs.sendMessage(tab.id, { 'action': 'scrape-text' }, (response)=>{
                //meaningless response. send response to avoid errors.
                sendResponse(response);
            });
        })
        
    }
    else if(message.action === 'scrape-link'){
        chrome.tabs.query(queryOptions, function ([tab]) {
            chrome.tabs.sendMessage(tab.id, { 'action': 'scrape-link' }, (response) => {
                //meaningless response. send response to avoid errors.
                sendResponse(response);
            });
        })
    }
    else if (message.action ==='get-text'){
        chrome.runtime.sendMessage({ 'action': 'output', 'output': message.output });
        outputs.push(message.output);
    }
    else if (message.action === 'get-link') {
        chrome.runtime.sendMessage({ 'action': 'output', 'output': message.output });
        outputs.push(message.output);
    }
    return true;
});