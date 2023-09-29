const onOffSwitch = document.querySelector('#OnOffSwitch');

async function toggleSwitch(enabled){
    await browser.storage.sync.set({
        enabled:enabled
    });
}

async function loadSettings(){
    let settings = await browser.storage.sync.get();
    onOffSwitch.checked = settings.enabled;
}

window.addEventListener('change',()=>{
    let enabled = onOffSwitch.checked;
    toggleSwitch(enabled);
})

document.addEventListener('DOMContentLoaded', loadSettings);