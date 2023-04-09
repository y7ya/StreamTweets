const target = document.querySelector('[data-testid="primaryColumn"]'); // data-testid="primaryColumn"


const observer = new MutationObserver(function (mutations, observer) {
  for (const mutation of mutations) {
    if (mutation.type !== "childList") continue;
    for (const node of mutation.addedNodes) {
      if(node.attributes[0]?.nodeName !== "data-testid") continue;
    }
  }
}).observe(target, {
  childList: true,
  subtree: true,
  attributes: true,
});

