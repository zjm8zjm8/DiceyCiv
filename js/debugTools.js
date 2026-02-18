/*
----------------------------
Debugging Tools
----------------------------
*/

function skipChapter0(){
	day = 10;
	food = 30;
	wood = 15;
	buyfarmcard();
	buystickcard();
	completeChapter0();
  }
  function skipChapter1(){
	skipChapter0();
	day = 30;
	food = 25;
	wood = 40;
	stone = 30;
	console.log(cardSlots);
	discoverStone(6);
	discoverOrg(1);
	discoverOrg(6);
	progressStone(6);
	progressStone(6);
	buylogcard();
	buyquarrycard();
	completeChapter1();
  }
  function skipChapter2(){
	skipChapter1();
	day = 60;
	food = 50;
	wood = 100;
	stone = 100;
	copper = 30;
	discoverWriting(10);
	discoverCopper(2);
	discoverCopper(2);
	discoverExpedition(35);
	buyGranary();
	buyWarehouse();
	buyQuarryCamp();
	buyLoggingCamp();
	completeChapter2();
  }