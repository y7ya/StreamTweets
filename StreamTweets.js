const target = document.querySelector('[data-testid="primaryColumn"]')??document.querySelector('body');
let settings = {
  enabled:true
};

async function getSettings(){
  let settings = await browser.storage.sync.get();
  return settings;
}

function setStreamTweet(node){
  if (node.closest('[data-testid="tweet"]')) {
    node.closest('[data-testid="tweet"]').classList.add('streamTweet');
  }
}

function hasLive(node){
  if(node.querySelector('video')){
    return node.querySelector('video').poster.includes('pscp.tv');
  }
  return false
}

async function storageChangeListener(e){
  settings = await getSettings(); 
}

browser.storage.sync.onChanged.addListener(storageChangeListener)
async function main(){
  settings = await getSettings();

  const observer = new MutationObserver(function (mutations, observer) {
    if(!settings.enabled) return;
  
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) {
        if (hasLive(node)) {
          setStreamTweet(node);
        }
      }
    }
    
  })
  
  observer.observe(target, {
    childList: true,
    subtree: true,
  });

}
main();

