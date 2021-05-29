var scrapeWindowId;
var scrapeWindow;
var panelWindow;
var currentTab;
let queryOptions = { active: true, windowId: scrapeWindowId };

async function getCurrentTab() {
    let queryOptions = { active: true, windowId: scrapeWindowId };
    chrome.tabs.query(queryOptions, function([tab]){
        currentTab=tab;
    })
}

chrome.browserAction.onClicked.addListener(function(tab){
    scrapeWindowId = tab.windowId;
    chrome.windows.get(scrapeWindowId, function(window){
        scrapeWindow=window;
    });
    chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        height: 500,
        width: 750
    },
    function (win) {
        panelWindow=win;
        // win represents the Window object from windows API
        // Do something after opening
    })
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    if (message === 'scrape-url') {
        chrome.tabs.query(queryOptions, function ([tab]) {
            sendResponse(tab.url);
        })
    }
    else if(message === 'scrape-text'){
        scrapeText();
        sendResponse('nmsl')
    }
    return true;
});