console.log("content script is executed")

function highlightElement(event){
    event.target.style.background = "yellow";
}

function disableHighlight(event){
    event.target.style.background = "";
}

function textHandler(event){
    chrome.runtime.sendMessage({ 'action': 'get-text', 'output': event.target.innerText});
    document.removeEventListener("mouseover", highlightElement);
    document.removeEventListener("mouseout", disableHighlight);
    disableHighlight(event);
    event.stopPropagation();
    event.preventDefault();
    document.removeEventListener('click', textHandler);
}

function linkHandler(event){
    if (event.target.href==null){
        alert("Link is undefined");
    }else{
        chrome.runtime.sendMessage({ 'action': 'get-link', 'output': event.target.href });
        document.removeEventListener("mouseover", highlightElement);
        document.removeEventListener("mouseout", disableHighlight);
        disableHighlight(event);
        event.stopPropagation();
        event.preventDefault();
        document.removeEventListener('click', linkHandler);
    }
}

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if(message.action==="scrape-text"){
            document.addEventListener("mouseover", highlightElement)
            document.addEventListener("mouseout", disableHighlight)
            document.addEventListener('click', textHandler);
        }
        else if(message.action === "scrape-link"){
            document.addEventListener("mouseover", highlightElement)
            document.addEventListener("mouseout", disableHighlight)
            document.addEventListener('click', linkHandler);
        }
        //meaningless response. send response to avoid errors.
        sendResponse("selecting");
        
    }
);


