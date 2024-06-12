chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action ==="getNoThumnailUrls"){
    let urls = getNoThumnailUrls();
    sendResponse({urls: urls});
  }
  return true;
});


function getNoThumnailUrls() {
  let urls = [];
  let targetDiv = document.querySelector('div.wkcwhc.HkP7Fc');
  let divs = targetDiv.querySelectorAll('div[jsname="ey8Pwb"]');
  divs.forEach((div) => {
    let aTag = div.querySelector('a');
    let imgTag = aTag.querySelector('img');
    if(imgTag.src === 'https://www.gstatic.com/save/no_image_webpage.svg'){
      urls.push(aTag.href);
    }
  });
  return urls;
}