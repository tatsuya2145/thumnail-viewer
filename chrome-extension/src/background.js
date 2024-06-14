let urls = [];

//タブが変更されたとき
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    tabUpdate();
  }
});

//アクティブなタブが変更されたとき
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.status === 'complete') {
      tabUpdate();
    }
  });
}); 

function tabUpdate(){
  let urls = getNoThumnailUrls();
  urls.then((urls) => {
    console.log(urls);
  }).catch((error) => {
    console.error(error);
  });  
}



function getNoThumnailUrls() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      let tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, {action: "getNoThumnailUrls"}, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response.urls);
        }
      });
    });
  });
}