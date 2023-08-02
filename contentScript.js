(async ()=>{
    const randomPickButtonExists = document.getElementsByClassName("random-pick-button")[0];
    if(!randomPickButtonExists){
        const menuList = document.getElementsByClassName("menu-list main-menu-list")[0];
        
        const featureContainer = document.createElement("li");
        featureContainer.className = "feature-container";

        const randomPickButton = document.createElement("img");
        randomPickButton.src = chrome.runtime.getURL("assets/shuffle_button.png");
        randomPickButton.className = "random-pick-button";
        
        const featureMenu = document.createElement("div");
        featureMenu.className = "feature-menu";
        
        featureContainer.appendChild(randomPickButton);
        featureContainer.appendChild(featureMenu);
        menuList.appendChild(featureContainer);
    }
})();