(async ()=>{
    const randomPickButtonExists = document.getElementsByClassName("random-pick-button")[0];
    if(!randomPickButtonExists){

        // Default UL list
        const menuList = document.getElementsByClassName("menu-list main-menu-list")[0];
        
        // Main container
        const featureContainer = document.createElement("li");
        featureContainer.className = "feature-container";

        // Feature Button
        const randomPickButton = document.createElement("img");
        randomPickButton.src = chrome.runtime.getURL("assets/shuffle_button.png");
        randomPickButton.className = "random-pick-button";
        
        // Feature Menu
        const featureMenu = document.createElement("div");
        featureMenu.className = "feature-menu";
        
        const featureTitle = document.createElement("h4");
        featureTitle.textContent = "Pick a random problem";
        
        // Features List
        const featureListSelectorContainer = document.createElement("div");
        // Rating
        const featureListRating = document.createElement("div");
        featureListRating.className = "feature"
        const ratingLabel = document.createElement("div");
        ratingLabel.textContent = "Rating range:";
        const ratingRangeBox = document.createElement("div");
        const ratingFrom = document.createElement("input");
        ratingFrom.type = "number";
        const ratingTo = document.createElement("input");
        ratingTo.type = "number";
        ratingFrom.className = "rating-input";
        ratingTo.className = "rating-input";
        ratingFrom.placeholder = "from";
        ratingTo.placeholder = "to";
        ratingRangeBox.appendChild(ratingFrom);
        ratingRangeBox.append(" - ");
        ratingRangeBox.appendChild(ratingTo);

        featureListRating.appendChild(ratingLabel);
        featureListRating.appendChild(ratingRangeBox);
        featureListSelectorContainer.appendChild(featureListRating);
        
        // Feature Controls
        const featureControlButtonsContainer = document.createElement("div");
        featureControlButtonsContainer.className = "control-button-container";
        // Buttons
        const goButton = document.createElement("button");
        goButton.textContent = "Go";
        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        featureControlButtonsContainer.appendChild(resetButton);
        featureControlButtonsContainer.appendChild(goButton);

        // Appending thingg together
        featureMenu.appendChild(featureTitle);
        featureMenu.appendChild(featureListSelectorContainer);
        featureMenu.appendChild(featureControlButtonsContainer);
        featureContainer.appendChild(randomPickButton);
        featureContainer.appendChild(featureMenu);
        menuList.appendChild(featureContainer);
    }
})();