/*
-------------------------------------
    Basic Drag and Drop functions
-------------------------------------
*/
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Using callback to allow cards to specify function on the fly.
function drop(event, callback) {
    event.preventDefault();
    var selDie = event.dataTransfer.getData("text");
    currentDie = event.dataTransfer.getData("text");
    callback(Number($("#" + selDie).data("dieVal")));
}
/*
-------------------------------------------
      Basic Tabbing Functions
-------------------------------------------
*/
function openTab(evt, tabName) {
    // Declare all variables
    var i,
    tabcontent,
    tablinks;
    if (tabName == "org") {
        if (organizeCooldown > 0) {
            tabName = "home";
        }
        buildOrgPage();
    }
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function hideTabs() {
    document.getElementById("tabs").style.display = "none";
}

function showTabs() {
    document.getElementById("tabs").style.display = "block";
}


function paintOrganizeTab(){
	if (organizeCooldown == 0){
		document.getElementById("orgTabButton").innerHTML = "Organize";
	}
	else{
		document.getElementById("orgTabButton").innerHTML = organizeCooldown;
	}
}
/*
--------------------------------------------------
      Basic Dice Functions
--------------------------------------------------
*/

function generateDice(value) {
    var dieVal = 0;
    if (value == 0) {
        dieVal = getRandomDieRoll();
    } else {
        dieVal = value;
    }
	// Numbers bigger than 12 roll over.
	if (value > 12){
		generateDice(value-12);
		dieVal = 12;
	}
    var id = generateId();
    var imgsrc = lookupImageSource(dieVal);
    var element = "<img id='" + id + "' src='" + imgsrc + "' draggable='true' ondragstart='drag(event)'></img>";
    $("#diceArea").append(element);
    $("#" + id).data("dieVal", dieVal);
    return 0;
}

function getRandomDieRoll() {
    return Math.floor(Math.random() * 6) + 1;
}

function lookupImageSource(value) {
    switch (value) {
    case 1:
        return "./images/onedie.png";
    case 2:
        return "./images/twodie.png";
    case 3:
        return "./images/threedie.png";
    case 4:
        return "./images/fourdie.png";
    case 5:
        return "./images/fivedie.png";
    case 6:
        return "./images/sixdie.png";
    case 7:
        return "./images/sevendie.png";
    case 8:
        return "./images/eightdie.png";
    case 9:
        return "./images/ninedie.png";
    case 10:
        return "./images/tendie.png";
    case 11:
        return "./images/elevendie.png";
    case 12:
        return "./images/twelvedie.png";
    default:
        return "./images/emptydie.png";

    }
}

function generateId() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 24; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function removeDie() {
    if (currentDie == null) {
        return;
    }
    if (currentDie.length > 0)
        document.getElementById(currentDie).remove();
    currentDie = "";
}

// It is incumbent on the function that calls this to remove the original die!
function splitDie(value){
	if (value <= 1){
		return false;
	}
	// Get a number less than the original value [1 to value]
	let dieOne = Math.floor(Math.random() * (value-1))+1;
	let dieTwo = value - dieOne;
	generateDice(dieOne);
	generateDice(dieTwo);
}
