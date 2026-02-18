/*
-----------------------------------------
Card Utils
-----------------------------------------
*/

function addCardToSlots(cardName){
    for (let i = 0; i < 8; i++){
        if (cardSlots[i] == ""){
            cardSlots[i] = cardName;
            return;
        }
    }
}
function addOrgCardToSlots(cardName){
    for (let i = 0; i < 8; i++){
        if (orgCardSlots[i] == ""){
            orgCardSlots[i] = cardName;
            return;
        }
    }
}
function addCardToCardsList(cardName){
    cards.push(cardName);
}
function addCard(cardData, position, isOrg){
    if (position >= 0 && position <= 7){
        let cardstr = "cardArea" + (position+1) + "";
        if (isOrg == true){
            cardstr = "orgCardArea" + (position+1) + "";
        }
        document.getElementById(cardstr).innerHTML = cardData;
    }
}
function repaintCard(cardName){
    for (let i = 0; i < 8; i++){
        if (orgCardSlots[i] == cardName){
            addCard(getCardData(cardName, "regular"), i, false);
        }
    }
}
function removeCardFromSlots(cardName){
    for (let i = 0; i < 8; i++){
        if (cardSlots[i] == cardName){
            cardSlots[i] = "";
        }
    }
}
function removeCard(cardName){
    cardsAssigned--;
    try{
        let x = document.getElementById(cardName);
        let y = x.parentNode;
        let z = y.id;
        y.innerHTML = "<div class='card'></div>";
    }
    catch{}
    //shiftCards(z);
}
function removeAllCards(){
    document.getElementById("cardArea1").innerHTML = "";
    document.getElementById("cardArea2").innerHTML = "";
    document.getElementById("cardArea3").innerHTML = "";
    document.getElementById("cardArea4").innerHTML = "";
    document.getElementById("cardArea5").innerHTML = "";
    document.getElementById("cardArea6").innerHTML = "";
    document.getElementById("cardArea7").innerHTML = "";
    document.getElementById("cardArea8").innerHTML = "";
}
function shiftCards(which){
    let currentDivNum = Number(which.substring(which.length - 1));
    for (let i = currentDivNum; i < maxCards; i++){
        let j = i+1;
        let tempName = "cardArea" + j + "";
        let temp = document.getElementById(tempName).innerHTML;
        document.getElementById("cardArea" + i + "").innerHTML = temp;
    }
    document.getElementById("cardArea8").innerHTML = "";
}

/*
------------------------------
Org Utilties
------------------------------
*/

function buildOrgPage(){
    for (let i = 0; i < 8; i++){
        orgCardSlots[i] = cardSlots[i]; // orgCardSlots needs to be a copy of cardSlots
    }
    buildOrgCards();
    buildSmallOrgCards();
}
function removeAllOrgCards(){
    document.getElementById("orgCardArea1").innerHTML = "";
    document.getElementById("orgCardArea2").innerHTML = "";
    document.getElementById("orgCardArea3").innerHTML = "";
    document.getElementById("orgCardArea4").innerHTML = "";
    document.getElementById("orgCardArea5").innerHTML = "";
    document.getElementById("orgCardArea6").innerHTML = "";
    document.getElementById("orgCardArea7").innerHTML = "";
    document.getElementById("orgCardArea8").innerHTML = "";
}
function buildOrgCards(){
    removeAllOrgCards();
    for (let i = 0; i < 8; i++){
        addCard(getCardData(orgCardSlots[i], "org"), i, true);
    }
}
function buildSmallOrgCards(){
    //Until I find a better way to do this, I'm going to have it spit out the cards, in order.
    let output = "<table><tr>";
    let placedCards = 0;
    for (let i = 0; i < cards.length; i++){
        if (!orgCardSlots.includes(cards[i]) && !completedScience.includes(cards[i])){
            output += "<td>"
            output += getCardData(cards[i], "orgSmall");
            output += "</td>"
            placedCards++;
            if (placedCards == 6){
                placedCards = 0;
                output += "</tr><tr>";
            }
        }
    }
    output += "</tr></table>"
    document.getElementById("orgButtonArea").innerHTML = output;
}
function orgCardRemove(which){
    for (let i = 0; i < 8; i++){
        if (orgCardSlots[i] == which){
            for (let j = i; j < 7; j++){
                orgCardSlots[j] = orgCardSlots[j+1]
            }
            orgCardSlots[7] = "";
            buildOrgCards();
            buildSmallOrgCards();
            return;
        }
    }
}
function orgCardAdd(which){
    addOrgCardToSlots(which);
    buildOrgCards();
    buildSmallOrgCards();
}
function commitOrg(){
    organizeCooldown = 10;
    paintOrganizeTab();
    for (let i = 0; i<8; i++){
        cardSlots[i] = orgCardSlots[i];
    }
    document.getElementById("defaultOpenTab").click();
    rebuildCards();
}