(async ()=>{
    const randomPickButtonExists = document.getElementsByClassName("random-pick-button")[0];
    if(!randomPickButtonExists){
        const menuList = document.getElementsByClassName("menu-list main-menu-list")[0];

        const randomPickButton = document.createElement("img");
        randomPickButton.src = chrome.runtime.getURL("assets/shuffle_button.png");
        randomPickButton.className = "random-pick-button";

        menuList.appendChild(randomPickButton);
    }
})();