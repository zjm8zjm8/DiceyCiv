/*
------------------------------------
Story progression methods
------------------------------------
*/



function showStoryIntro(){
    alert("Legend tells of a dicey kingdom that existed long ago. " +
    "A land where dice were free to roll how they may. A land where dice could do more than just survive. " +
    "It was destroyed by the FOUR DICEMEN OF THE APOCALYPSE. " +
    "You are in an idyllic meadow, and the thought strikes you that you might be the one " + 
    "who could rebuild the KINGDOM OF DICE.");
}

function completeChapter0(){
    if (wood < 5){
        return false
    }
    else{
        wood -= 5;
        $("#completeChapter0Button").remove();
        $("#victoryAudio")[0].play();
        unlocks.ownsDiscoverStoneCard = true;
        unlocks.ownsDiscoverOrganizationCard = true;
        addCardToCardsList("discoveryStone");
        addCardToCardsList("discoveryOrg");
        addCardToSlots("discoveryStone");
        addCardToSlots("discoveryOrg");
        alert("Finally, some real shelter! You are so tired of living in a hastily built lean-to. You have a place to think now. The foundation of your new kingdom has been laid. Beware, your activity will not go unnoticed by the FOUR DICEMEN OF THE APOCALYPSE for long...");
    }
    repaintResources();
}

function completeChapter1(){
    if (wood >= 12 && stone >= 5){
        wood -= 12;
        stone -= 5;
        $("#completeChapter1Button").remove();
        $("#victoryAudio")[0].play();
        alert("You have begun the spark of civilization! The FOUR DICEMEN will surely come after you now. Be prepared to weather their tempests, as there is nothing that could possibly fight a god. Or is there? Your new kingdom will now need to grow even further. Perhaps you will rival the heights of the old kingdom?");
        population = 3;
        wrath = true;
        createChapter2Buttons();
        addCardToCardsList("discoveryCopper");
        addCardToCardsList("discoveryExpedition");
        addCardToCardsList("discoveryWriting");
        addCardToSlots("discoveryCopper");
        addCardToSlots("discoveryExpedition");
        addCardToSlots("discoveryWriting");
        alert("You now have more than 8 cards. Use the organization tab to select which cards you would like to use.");
    }
    repaintResources();
}

function completeChapter2(){
    if (wood >= 20 && stone >= 20 && copper >= 5){
        wood -=20;
        stone -=20;
        copper -=5;
        $("#completeChapter2Button").remove();
        $("#victoryAudio")[0].play();
        organizeCooldown = 0;
        paintOrganizeTab();
        repaintResources();
        // add new cards
        /*
            discoveryLogistics, readyTroops, 
        */
        
        alert("The moment you finished the temple, you received a strange visit. A rivaling tribe of strange looking dice who call themselves the Deephors introduce themselves. You can feel the tension in the air. They are jealous of your accomplishments and look at your supplies hungrily. Kreig, master of discord, must be whispering in their ears. You must defend yourself!");
        alert("Congratulations! You've completed the game, for now.");
        
    }
}

function createChapter0Buttons(){
    document.getElementById("buttonArea").innerHTML += "<br>" +
    "<button id=buyfarmButton onclick='buyfarmcard()'>Start Farming (requires 5 food)</button>" +
    "<button id=buystickButton onclick='buystickcard()'>Start Gathering Sticks (requires 8 food)</button>" +
    "<button class=final id=completeChapter0Button onclick='completeChapter0()'>Build your first hut (requires 5 wood)</button>";
}
function createChapter1Buttons(){
    document.getElementById("buttonArea").innerHTML += "<button id=buylogButton onclick='buylogcard()'>Better Axes (requires 5 wood, 5 stone)</button>" +
    "<button id=buyquarryButton onclick='buyquarrycard()'>Quarry Stone (requires 8 wood, 3 stone)</button>" +
    "<button class=final id=completeChapter1Button onclick='completeChapter1()'>Build A Grand Bonfire (requires 12 wood, 5 stone)</button>";
}
function createChapter2Buttons(){   
    document.getElementById("buttonArea").innerHTML += "<button id=buyGranaryButton onclick='buyGranary()'>Build Granary (requires 15 wood, 10 stone)</button>" + 
    "<button id=buyWarehouseButton onclick='buyWarehouse()'>Build Warehouse (requires 12 wood, 10 stone)</button>";
}
function createOtherChapter2Buttons(){
    document.getElementById("buttonArea").innerHTML += "<button id=buyLoggingCampButton onclick='buyLoggingCamp()'>Build Logging Camp (requires 20 wood, 10 stone, 3 copper)</button>" +
    "<button id=buyQuarryCampButton onclick='buyQuarryCamp()'>Build Quarry Camp (requires 10 wood, 20 stone, 3 copper)</button>";
}
function createLastChapter2Button(){
    document.getElementById("buttonArea").innerHTML += "<button class=final id=completeChapter2Button onclick='completeChapter2()'>Build Temple (requires 20 wood, 20 stone, 5 copper)</button>";
}