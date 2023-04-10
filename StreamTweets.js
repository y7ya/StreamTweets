const target = document.querySelector('[data-testid="primaryColumn"]')??document.querySelector('body');

const observer = new MutationObserver(function (mutations, observer) {
  for (const mutation of mutations) {
    if(mutation.type !== "childList") continue;
    for (const node of mutation.addedNodes) {
      if(hasLive(node)){
        if(node.closest('[data-testid="tweet"]')){
          node.closest('[data-testid="tweet"]').style.backgroundColor = 'red';
        }
      }
    }
  }
}).observe(target, {
  childList: true,
  subtree: true,
});

function hasLive(node){
  if(node.querySelector('video')){
    return node.querySelector('video').poster.includes('pscp.tv');
  }
  return false
}