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
        const featureMenu = document.createElement("form");
        featureMenu.className = "feature-menu " + "invis";;
        
        const featureTitle = document.createElement("h4");
        featureTitle.textContent = "Pick a random problem";
        
        // Features List
        const featureListSelectorContainer = document.createElement("div");
        // Rating
        const featureListRating = document.createElement("div");
        featureListRating.className = "feature " 
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
        goButton.type = "submit";
        goButton.textContent = "Go";
        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        featureControlButtonsContainer.appendChild(resetButton);
        featureControlButtonsContainer.appendChild(goButton);
        
        // Appending things together
        featureMenu.appendChild(featureTitle);
        featureMenu.appendChild(featureListSelectorContainer);
        featureMenu.appendChild(featureControlButtonsContainer);
        featureContainer.appendChild(randomPickButton);
        featureContainer.appendChild(featureMenu);
        menuList.appendChild(featureContainer);
        
        // ErrorBox
        const errorBox = document.createElement("div");
        errorBox.style.color = "red";
        errorBox.style.marginTop = "5px";
        errorBox.textContent = "No problems found for selected filters!"

        // Loading Overlay
        const loadingOverlay = document.createElement("div");
        loadingOverlay.className = "loading-overlay";
        const loadingIcon = document.createElement("img");
        loadingIcon.style.width = "40px"
        loadingIcon.src = chrome.runtime.getURL("assets/loading_icon.gif"); 
        loadingOverlay.appendChild(loadingIcon);


        // Binding listeners
        // Main button
        randomPickButton.addEventListener("click", () => {
            featureMenu.classList.toggle("invis");
            if(featureMenu.classList.contains("invis")){
                document.activeElement.blur();
            }else{
                ratingFrom.focus();
            }
        });
        // Reset Button
        resetButton.addEventListener("click", () => {
            if(featureMenu.contains(errorBox)){
                featureMenu.removeChild(errorBox);
            }
            ratingFrom.value = "";
            ratingTo.value = "";
        });
        // Go button
        const pickRandom = async() => {
            if(featureMenu.contains(errorBox)){
                featureMenu.removeChild(errorBox);
            }
    
            featureMenu.appendChild(loadingOverlay);
            
            let low = 0;
            if(ratingFrom.value != ""){
                low = ratingFrom.value;
            }
            let high = 3200;
            if(ratingTo.value != ""){
                high = ratingTo.value;
            }
    
            let data = await fetch("https://codeforces.com/api/problemset.problems");
            data = await data.json();
            let problems = data.result.problems;
            let found = false;
            
            while(problems.length != 0){
                let problemNo = Math.floor(Math.random() * 10000000000) % problems.length;
                let problem = problems[problemNo];
                if(problem.rating && problem.rating >= low && problem.rating <= high){
                    window.open(`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`);
                    featureMenu.classList.toggle("invis");
                    found = true;
                    break;
                }else{
                    problems.splice(problemNo, 1);
                }
            }
            
            if(!found){
                featureMenu.appendChild(errorBox);
            }
            featureMenu.removeChild(loadingOverlay);
            return;
        }

        featureMenu.addEventListener("submit", (e) => {
            e.preventDefault();
            pickRandom();
        });

        return;
    }
})();