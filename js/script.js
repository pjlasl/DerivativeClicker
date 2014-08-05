/* Todo: add more statistics, ???add upgrade paths????, add more derivatives
Rollover hilarious jokes/stats
Reset currency buyables: change click improver to reset curr buyable, ticks between builds decrease, upgrades influenced by certain buildings
*/

var startPlayer = {
	//currencies
	money: 0.1,
	moneyPerSecond: 0,
	netMoneyPerSecond: 0,
	moneyPerClick: 1,
	moneyPerAutoclick: 0,
	clickPower: 1,
	proofs: 0,
	proofsPerSecond: 0,
	costPerProof: 5,
	deriv1Money: 0.05,
	
	/* main buildings: indexes
	0: deriv1, 1: combinatorics, 2: computer, 3: high schooler, 4: mathematician
	5: deriv2, 6: probability, 7: assembly line, 8: undergraduate, 9: andrew wiles
	10: deriv3, 11: number theory, 12: factory, 13: graduate student, 14: kurt godel
	15: deriv4, 16: calculus, 17: factory architect, 18: postdoc, 19: bernhard riemann 
	20: deriv5, 21: algebra, 22: design school, 23: research scientist, 24: carl gauss
	25: deriv6, 26: geometry, 27: dean of architecture, 28: lab manager, 29: leonhard euler
	30: deriv7, 31: arithmetic, 32: chancellor, 33: research lab, 34: isaac newton
	*/
	buildings: [new Building(1.1, 0.1, 0), new Building(1.1, 25000, 0), new Building(1.3, 0, 3), new Building(1.1, 5, 0), new Building(1.05, 1000, 0),
				 new Building(1.2, 500, 0), new Building(1.3, 20000000, 0), new Building(1.8, 0, 20000), new Building(1.2, 1000, 0), new Building(1.2, 100000000, 0),
				 new Building(1.3, 20000, 0), new Building(1.8, 1000000000, 0), new Building(2.5, 0, 1000000), new Building(1.4, 100000, 0), new Building(1.5, 10000000000000, 0),
				 new Building(1.5, 1000000, 1000), new Building(2.5, 500000000000, 0), new Building(4, 0, 30000000), new Building(2, 10000000, 0), new Building(2, 1000000000000000000, 0),
				 new Building(2, 200000000, 500000), new Building(3, 20000000000000, 0), new Building(5, 0, 1000000000), new Building(2.7, 10000000000, 0), new Building(3, 100000000000000000000000, 0),
				 new Building(2.3, 50000000000, 25000000), new Building(3.5, 10000000000000000, 0), new Building(6, 0, 300000000000), new Building(3.2, 10000000000000, 0), new Building(3.5, 10000000000000000000000000, 0),
				 new Building(2.7, 1000000000000, 1000000000), new Building(4, 500000000000000000, 0), new Building(8, 0, 10000000000000), new Building(3.7, 1000000000000000, 0), new Building(4, 1000000000000000000000000000, 0)],

	/* upgrades: indexes
	tier upgrades: 0: tier 1 upgrade, 1: tier 2 upgrade, 2: tier 3 upgrade, 3: tier 4 upgrade, 4: tier 5 upgrade, 5: tier 6 upgrade, 6: tier 7 upgrade
	upgrades: 0: autoclicker, 1: click improver
	*/	
	tierUpgrades: [0, 0, 0, 0, 0, 0, 0],
	upgrades: [0, 0],
	tierUpgradeCosts: [1000000, 1000000000, 1000000000000, 1000000000000000, 1000000000000000000, 1000000000000000000000, 1000000000000000000000000],
	upgradeCosts: [100000, 10000000],
	
	//upgrade multipliers
	mult: [1, 1, 1, 1, 1, 1, 1],
	
	//other tracking variables
	clickTracker: 0,
	updateInterval: 1000,
	numToBuy: 1,
	timeMult: 1,
	
	//these variables aren't changed by resets	
	//statistics
	totalMoneyEarned: 0,
	totalProofs: 0,
	totalClicks: 0,
	totalManualClicks: 0,
	totalTicks: 0,
	proofsToNextCurr: 10000000000000,
	proofsToCurrTracker: 0,
	mathematiciansToNextCurr: 7000000000,
	mathematiciansToNextCurrTracker: 0,
	resetCurrTracker: 0, //this variable does have to be reset
	
	//reset currency buyable things
	resetCurrFactor: 5, //integer
	buildingInterval: 10,
	autoclickInterval: 60,
	clicksToGain: 25,
	
	/*reset currency buyables: columns down
	 * 0: tier 5,                  6: click improver stage 1,  12: building tick decrease stage 1, 18: autoclicker tick decrease stage 1
	 * 1: tier 6,                  7: click improver stage 2,  13: building tick decrease stage 2, 19: autoclicker tick decrease stage 2
	 * 2: tier 7,                  8: click improver stage 3,  14: building tick decrease stage 3, 20: autoclicker tick decrease stage 3
	 * 3: factor decrease stage 1, 9: click improver stage 4,  15: building tick decrease stage 4, 21: reset currency conversion factor stage 1
	 * 4: factor decrease stage 2, 10: click improver stage 5, 16: building tick decrease stage 5, 22: reset currency conversion factor stage 2
	 * 5: factor decrease stage 3, 11: click improver stage 6, 17: building tick decrease stage 6, 23: reset currency conversion factor stage 3
	 */
	currBuyables: [new CurrBuyable([10, 0, 0, 0, 0, 0]), new CurrBuyable([0, 50, 0, 0, 0, 0]), new CurrBuyable([0, 0, 100, 0, 0, 0]), new CurrBuyable([0, 0, 0, 100, 0, 0]), new CurrBuyable([0, 0, 0, 0, 100, 0]), new CurrBuyable([0, 0, 0, 0, 0, 100]),
	               new CurrBuyable([1e3, 0, 0, 0, 0, 0]), new CurrBuyable([0, 1e3, 0, 0, 0, 0]), new CurrBuyable([0, 0, 2e3, 0, 0, 0]), new CurrBuyable([0, 0, 0, 5e3, 0, 0]), new CurrBuyable([0, 0, 0, 0, 1e4, 0]), new CurrBuyable([0, 0, 0, 0, 0, 2e4]),
	               new CurrBuyable([1e5, 0, 0, 0, 0, 0]), new CurrBuyable([0, 1e5, 0, 0, 0, 0]), new CurrBuyable([0, 0, 2e5, 0, 0, 0]), new CurrBuyable([0, 0, 0, 2e5, 0, 0]), new CurrBuyable([0, 0, 0, 0, 5e5, 0]), new CurrBuyable([0, 0, 0, 0, 0, 5e5]),
	               new CurrBuyable([1e7, 0, 0, 0, 0, 0]), new CurrBuyable([0, 1e7, 0, 0, 0, 0]), new CurrBuyable([0, 0, 2e7, 0, 0, 0]), new CurrBuyable([0, 0, 0, 1e9, 0, 0]), new CurrBuyable([0, 0, 0, 0, 2e9, 0]), new CurrBuyable([0, 0, 0, 0, 0, 5e9])],
	//settings
	sciNotation: false,
	minTickLength: 100,
	
	numResets: [0, 0, 0, 0, 0, 0, 0],
	resetCurr: [0, 0, 0, 0, 0, 0, 0],
	versionNum: versionNum
};

var player = deepObjCopy(startPlayer);

var versionNum = 0.32;

//these variables hold constants between plays
var upgradeCostFactor = [1.5, 100];

var globalMult = [1, 1, 1, 1, 1, 1, 1];

var numTiers = 7;

var isActive = true;

window.onfocus = function(){isActive = true;};
window.onblur = function(){isActive=false;};

//functions that add to variables
function addMoney(money) {
	player.money = Math.round((player.money + money)*100)/100;
	if(money > 0){
		player.totalMoneyEarned = Math.round((player.totalMoneyEarned + money)*100)/100;
	}
}

function addMoneyPerSecond(mps){
	player.moneyPerSecond = Math.round((player.moneyPerSecond + mps)*100)/100;
}

function addNetMoneyPerSecond(nmps){
	player.netMoneyPerSecond = Math.round((player.netMoneyPerSecond + nmps)*100)/100;
}

function addMoneyPerClick(mpc){
	player.moneyPerClick = Math.round((player.moneyPerClick + mpc)*100)/100;
}

function addProofs(proofs){
	player.proofs += Math.round(proofs);
	player.proofsToNextCurr -= Math.round(proofs);
	player.totalProofs += Math.round(proofs);
	addMoney(-Math.round(proofs) * player.costPerProof);
}

//function to display values
function displayNum(num, ifMoney){
	displayNum.suffixes = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "Nn", "Dc", "UDc", "DDc", "TDc", "QaDc", "QtDc", "SxDc", "SpDc", "ODc", "NDc", "Vi", 
						   "UVi", "DVi", "TVi", "QaVi", "QtVi", "SxVi", "SpVi", "OcVi", "NnVi", "Tg", "UTg", "DTg", "TTg", "QaTg", "QtTg", "SxTg", "SpTg", "OcTg", "NnTg", "Qd",
						   "UQd", "DQd", "TQd", "QaQd", "QtQd", "SxQd", "SpQd", "OcQd", "NnQd", "Qq", "UQq", "DQq", "TQq", "QaQq", "QtQq", "SxQq", "SpQq", "OcQq", "NnQq", "Sg"]
	
	if(player.sciNotation) return Math.abs(num) < 100000 ? (ifMoney ? parseFloat(num).toFixed(2) : num) : parseFloat(num).toPrecision(5);
	
	for(var i = displayNum.suffixes.length - 1; i >= 0; i--){
		if(Math.abs(num) >= Math.pow(10, 3*i + 3) * 0.99999){
			return i < 4 ? parseFloat(num/Math.pow(10, 3*i + 3)).toFixed(2) + displayNum.suffixes[i] : parseFloat(num/Math.pow(10, 3*i + 3)).toFixed(2) + " " + displayNum.suffixes[i]; //spaces out first four suffixes
		}
	}
	
	return ifMoney ? parseFloat(num).toFixed(2) : num;
}

//function that recalculates the multipliers associated with upgrades
function calcMult(mult){
	var index = mult - 1;
	calcMult.factors = [0.0005, 0.002, 0.005, 0.01, 0.02, 0.04, 0.06];
	var totalBuildings = 0;
	
	for(var i = mult*5 - 5; i < mult*5; i++){
		totalBuildings += player.buildings[i].manual;
	}
	
	player.mult[index] = Math.round(10000 + (player.tierUpgrades[index] * calcMult.factors[index] * totalBuildings * 10000)) / 10000;
}

function calcGlobalMult(){
	for(var i = 0; i < globalMult.length; i++){
		globalMult[i] = parseFloat((player.resetCurr[i] * 0.01) + 1).toFixed(2);
	}
}

//function that calculates price of buying multiple buildings at once
function calcTotalPrice(price, factor, number){
	return price*((Math.pow(factor, number) - 1)/(factor - 1));
}

//function that allows number to buy to be adjusted
function getNumToBuy(num){
    var activeTab = $("#tabs").tabs("option", "active");
	if(num === -1){
		player.numToBuy = "Max";
	}
	else{
		var newNum = parseInt(num);
		if(!isNaN(newNum) && newNum > 0){
			player.numToBuy = newNum;
		}
	}
    $("#currentNumToBuy").html(player.numToBuy);
	$("#currentNumToBuy2").html(player.numToBuy);
	if(activeTab == 0) updateInventory();
}

function factorial(n){
	if(n <= 1) return 1;
	return n*factorial(n-1);
}

function deepObjCopy (dupeObj) {
    var retObj = new Object();
    if (typeof(dupeObj) == 'object') {
        if (typeof(dupeObj.length) != 'undefined')
            var retObj = new Array();
        for (var objInd in dupeObj) {   
            if (typeof(dupeObj[objInd]) == 'object') {
                retObj[objInd] = deepObjCopy(dupeObj[objInd]);
            } else if (typeof(dupeObj[objInd]) == 'string') {
                retObj[objInd] = dupeObj[objInd];
            } else if (typeof(dupeObj[objInd]) == 'number') {
                retObj[objInd] = dupeObj[objInd];
            } else if (typeof(dupeObj[objInd]) == 'boolean') {
                ((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false);
            }
        }
    }
    return retObj;
}

//functions that handle saving
function init(){
	player = deepObjCopy(startPlayer);
};

function save() {
	localStorage.setItem("playerStored", JSON.stringify(player));
	localStorage.setItem("enableChart", JSON.stringify(enableChart));
	
	var d = new Date();
	$("#lastSave").html(d.toLocaleTimeString());
	
	ga('send', 'event', 'save', 'click', 'save'); //analytics
}

function load() {
	$.extend(true, player, JSON.parse(localStorage.getItem("playerStored")));
	enableChart = JSON.parse(localStorage.getItem("enableChart"));
}

function wipe() {
	var confirmation = confirm("Are you sure you want to permanently erase your savefile?");
	if(confirmation === true){
		init();
		localStorage.setItem("playerStored", JSON.stringify(player));
		calcGlobalMult();
		
		updateAll();
		$("#currentNumToBuy").html(player.numToBuy);
	}
}

function exportSave() {
	var exportText = btoa(JSON.stringify(player));
	
	$("#exportSaveContents").toggle();
	$("#exportSaveText").val(exportText);
	$("#exportSaveText").select();
}

function importSave(){
	var importText = prompt("Paste the text you were given by the export save dialog here.\n" +
								"Warning: this will erase your current save!");
	if(importText){
		init();
		$.extend(true, player, startPlayer, JSON.parse(atob(importText)));
		versionControl(true);
		if(player.upgrades[1] == 24) player.upgradeCosts[1] = Infinity;
		save();
		calcGlobalMult();
		$("#currentNumToBuy").html(player.numToBuy);
		
		updateAll();
	}
}

function setMinTickLength(){
    var minTickLength;
    do{
        minTickLength = prompt("Enter a new minimum tick length between 10 and 1000 (noninclusive).");
    } while((minTickLength >= 1000 || minTickLength <= 10) && minTickLength != null)
    
    if(minTickLength == null) return;
    
    player.minTickLength = minTickLength;
    player.timeMult = 1;
    while(player.updateInterval * player.timeMult < player.minTickLength) player.timeMult *= 1000 / player.minTickLength;
    $("#minTickLength").html(minTickLength);
}

function ifMoreDerivs(tier){
	if(player.numResets[tier - 1] == 0 && tier <= 3) return "Access to another derivative.\n"
	return "";
}

function reset(tier) {
	var index = tier - 1;
	
	if(player.buildings[4 + 5 * index].owned < 7000000000){
		alert("You must have 7 billion mathematicians of tier " + tier + " to do this!")
	}
	else{
		var confirmationText = "Are you sure you want to reset? You will gain: \n";
		
		confirmationText += (displayNum(player.resetCurrTracker, false) + " tier 1 reset currency.\n");
		if(tier > 1){
			for(var i = 1; i < tier; i++){
				confirmationText += (displayNum(Math.floor(player.resetCurr[i- 1] / player.resetCurrFactor, false)) + " tier " + (i + 1) + " reset currency.\n");
				confirmationText += ("At the cost of " + displayNum(Math.floor(player.resetCurr[i - 1] / player.resetCurrFactor) * player.resetCurrFactor, false) + " tier " + i + " reset currency.\n");
			}
		}
				
		confirmationText += "\n\nYes, I know this looks pretty awful. If you have any ideas on how to restructure the text here I\'m all ears."
		
		var confirmation = confirm(confirmationText);
		
		if(confirmation === true){
			player.numResets[index]++;
			if(tier > 1){
				for(var i = index; i > 0; i--){
					player.resetCurr[i] += Math.floor(player.resetCurr[i - 1] / player.resetCurrFactor);
					player.resetCurr[i - 1] %= player.resetCurrFactor;
				}
			}
			player.resetCurr[0] += player.resetCurrTracker;
			calcGlobalMult();
			
			//resets variables that are erased by reset
			$.extend(true, player, {
				money: 0.1,
				moneyPerSecond: 0,
				netMoneyPerSecond: 0,
				moneyPerClick: 1,
				clickPower: 1,
				moneyPerAutoclick: 0,
				proofs: 0,
				proofsPerSecond: 0,
				costPerProof: 5,
				deriv1Money: 0.05,
				buildings: [new Building(1.1, 0.1, 0), new Building(1.1, 25000, 0), new Building(1.3, 0, 2), new Building(1.1, 5, 0), new Building(1.05, 1000, 0),
							 new Building(1.2, 500, 0), new Building(1.3, 20000000, 0), new Building(1.8, 0, 20000), new Building(1.2, 1000, 0), new Building(1.2, 100000000, 0),
							 new Building(1.3, 20000, 0), new Building(1.8, 1000000000, 0), new Building(2.5, 0, 1000000), new Building(1.4, 100000, 0), new Building(1.5, 10000000000000, 0),
							 new Building(1.5, 1000000, 1000), new Building(2.5, 500000000000, 0), new Building(4, 0, 30000000), new Building(2, 10000000, 0), new Building(2, 1000000000000000000, 0),
							 new Building(2, 200000000, 500000), new Building(3, 20000000000000, 0), new Building(5, 0, 1000000000), new Building(2.7, 10000000000, 0), new Building(3, 100000000000000000000000, 0),
							 new Building(2.3, 50000000000, 25000000), new Building(3.5, 10000000000000000, 0), new Building(6, 0, 300000000000), new Building(3.2, 10000000000000, 0), new Building(3.5, 10000000000000000000000000, 0),
							 new Building(2.7, 1000000000000, 1000000000), new Building(4, 500000000000000000, 0), new Building(8, 0, 10000000000000), new Building(3.7, 1000000000000000, 0), new Building(4, 1000000000000000000000000000, 0)],
				tierUpgrades: [0, 0, 0, 0, 0, 0, 0],
				upgrades: [0, 0],
				tierUpgradeCosts: [1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24],
				upgradeCosts: [100000, 10000000],
				mult: [1, 1, 1, 1, 1, 1, 1],
				clickTracker: 0,
				updateInterval: 1000,
				timeMult: 1,
				resetCurrTracker: 0
			});
			if(player.currBuyables[3].owned){
				for (var i = 0; i < player.buildings.length; i++){
					player.buildings[i].factor = 1 + (player.buildings[i].factor - 1) / 1.1;
				}
				if(player.currBuyables[4].owned){
					for (var i = 0; i < player.buildings.length; i++){
						player.buildings[i].factor = 1 + (player.buildings[i].factor - 1) / 1.1;
					}
					if(player.currBuyables[5].owned){
						for (var i = 0; i < player.buildings.length; i++){
							player.buildings[i].factor = 1 + (player.buildings[i].factor - 1) / 1.1;
						}
					}
				}
			}
			updateAll();
			
			ga('send', 'event', 'reset', 'click', 'reset'); //analytics
		}
	}
}

//templates
var moneyTableTemplate = _.template($("#moneyTableTemplate").html());
var inventoryTemplate = _.template($("#inventoryTemplate").html());
var row5Template = _.template($("#row5Template").html())
var row6Template = _.template($("#row6Template").html())
var row7Template = _.template($("#row7Template").html())
var upgradesTemplate = _.template($("#upgradesTemplate").html());
var statsTemplate = _.template($("#statsTemplate").html());
var prestigeTemplate = _.template($("#prestigeTemplate").html());

//functions that update stuff onscreen
function updateMoney() {
	var newMoneyTable = moneyTableTemplate({money: displayNum(player.money, true), moneyPerSecond: displayNum(player.moneyPerSecond, true), netMoneyPerSecond: displayNum(player.netMoneyPerSecond, true), 
											proofs: displayNum(player.proofs, false), proofsPerSecond: displayNum(player.proofsPerSecond, false), moneyPerClick: displayNum(player.moneyPerClick * player.clickPower, true), 
											tickLength: parseFloat(player.updateInterval * player.timeMult).toFixed(0), timeMult: displayNum(player.timeMult, true), moneyPerAutoclick: displayNum(player.moneyPerAutoclick, true)});

	$("#info").html(newMoneyTable);
}

function updateInventory() {
	var firstRows = inventoryTemplate({deriv1Owned: displayNum(player.buildings[0].owned, false), deriv1Cost: displayNum(player.buildings[0].moneyCost, true), deriv1Manual: displayNum(player.buildings[0].manual, false), deriv1Power: displayNum(0.05 * player.mult[0] * globalMult[0], true),
										deriv2Owned: displayNum(player.buildings[5].owned, false), deriv2Cost: displayNum(player.buildings[5].moneyCost, true), deriv2Manual: displayNum(player.buildings[5].manual, false), deriv2Power: displayNum(Math.round(player.mult[1] * globalMult[1]), false),
										deriv3Owned: displayNum(player.buildings[10].owned, false), deriv3Cost: displayNum(player.buildings[10].moneyCost, true), deriv3Manual: displayNum(player.buildings[10].manual, false), deriv3Power: displayNum(Math.round(player.mult[2] * globalMult[2]), false),
										deriv4Owned: displayNum(player.buildings[15].owned, false), deriv4MoneyCost: displayNum(player.buildings[15].moneyCost, true), deriv4WidgetCost: displayNum(player.buildings[15].proofCost, false), deriv4Manual: displayNum(player.buildings[15].manual, false), deriv4Power: displayNum(Math.round(player.mult[3] * globalMult[3]), false),
										combinatoricsOwned: displayNum(player.buildings[1].owned, false), combinatoricsCost: displayNum(player.buildings[1].moneyCost, true), combinatoricsManual: displayNum(player.buildings[1].manual, false), combinatoricsPower: displayNum(Math.round(player.mult[0] * globalMult[0]), false),
										probabilityOwned: displayNum(player.buildings[6].owned, false), probabilityCost: displayNum(player.buildings[6].moneyCost, true), probabilityManual: displayNum(player.buildings[6].manual, false), probabilityPower: displayNum(Math.round(player.mult[1] * globalMult[1]), false),
										numberTheoryOwned: displayNum(player.buildings[11].owned, false), numberTheoryCost: displayNum(player.buildings[11].moneyCost, true), numberTheoryManual: displayNum(player.buildings[11].manual, false), numberTheoryPower: displayNum(Math.round(player.mult[2] * globalMult[2]), false),
										calculusOwned: displayNum(player.buildings[16].owned, false), calculusCost: displayNum(player.buildings[16].moneyCost, true), calculusManual: displayNum(player.buildings[16].manual, false), calculusPower: displayNum(Math.round(player.mult[3] * globalMult[3]), false),
										computerOwned: displayNum(player.buildings[2].owned, false), computerCost: displayNum(player.buildings[2].proofCost, false), computerManual: displayNum(player.buildings[2].manual, false), computerPower: displayNum(2 * player.mult[0] * globalMult[0], true), 
										assemblyLineOwned: displayNum(player.buildings[7].owned, false), assemblyLineCost: displayNum(player.buildings[7].proofCost, false), assemblyLineManual: displayNum(player.buildings[7].manual, false), assemblyLinePower: displayNum(Math.round(3 * player.mult[1] * globalMult[1]), false),
										factoryOwned: displayNum(player.buildings[12].owned, false), factoryCost: displayNum(player.buildings[12].proofCost, false), factoryManual: displayNum(player.buildings[12].manual, false), factoryPower: displayNum(Math.round(3 * player.mult[2] * globalMult[2]), false),
										factoryArchitectOwned: displayNum(player.buildings[17].owned, false), factoryArchitectCost: displayNum(player.buildings[17].proofCost, false), factoryArchitectManual: displayNum(player.buildings[17].manual, false), factoryArchitectPower: displayNum(Math.round(3 * player.mult[3] * globalMult[3]), false),
										highSchoolerOwned: displayNum(player.buildings[3].owned, false), highSchoolerCost: displayNum(player.buildings[3].moneyCost, true), highSchoolerManual: displayNum(player.buildings[3].manual, false), highSchoolerPower: displayNum(0.1 * player.mult[0] * globalMult[0], true),
										undergraduateOwned: displayNum(player.buildings[8].owned, false), undergraduateCost: displayNum(player.buildings[8].moneyCost, true), undergraduateManual: displayNum(player.buildings[8].manual, false), undergraduatePower: displayNum(Math.round(player.mult[1] * globalMult[1]), false),
										graduateStudentOwned: displayNum(player.buildings[13].owned, false), graduateStudentCost: displayNum(player.buildings[13].moneyCost, true), graduateStudentManual: displayNum(player.buildings[13].manual, false), graduateStudentPower: displayNum(Math.round(player.mult[2] * globalMult[2]), false),
										postdocOwned: displayNum(player.buildings[18].owned, false), postdocCost: displayNum(player.buildings[18].moneyCost, true), postdocManual: displayNum(player.buildings[18].manual, false), postdocPower: displayNum(Math.round(player.mult[3] * globalMult[3]), false),
										mathematicianOwned: displayNum(player.buildings[4].owned, false), mathematicianCost: displayNum(player.buildings[4].moneyCost, true), mathematicianManual: displayNum(player.buildings[4].manual, false),
										andrewWilesOwned: displayNum(player.buildings[9].owned, false), andrewWilesCost: displayNum(player.buildings[9].moneyCost, true), andrewWilesManual: displayNum(player.buildings[9].manual, false), andrewWilesPower: displayNum(Math.round(player.mult[1] * globalMult[1]), false),
										kurtGodelOwned: displayNum(player.buildings[14].owned, false), kurtGodelCost: displayNum(player.buildings[14].moneyCost, true), kurtGodelManual: displayNum(player.buildings[14].manual, false), kurtGodelPower: displayNum(Math.round(player.mult[2] * globalMult[2]), false),
										georgRiemannOwned: displayNum(player.buildings[19].owned, false), georgRiemannCost: displayNum(player.buildings[19].moneyCost, true), georgRiemannManual: displayNum(player.buildings[19].manual, false), georgRiemannPower: displayNum(Math.round(player.mult[3] * globalMult[3]), false),
										clicksToGain: player.clicksToGain, buildingPeriod: player.buildingInterval});
	
	var row5 = row5Template({deriv5Owned: displayNum(player.buildings[20].owned, false), deriv5MoneyCost: displayNum(player.buildings[20].moneyCost, true), deriv5ProofCost: displayNum(player.buildings[20].proofCost, true), deriv5Manual: displayNum(player.buildings[20].manual, false), deriv5Power: displayNum(Math.round(player.mult[4] * globalMult[4]), false),
										algebraOwned: displayNum(player.buildings[21].owned, false), algebraCost: displayNum(player.buildings[21].moneyCost, true), algebraManual: displayNum(player.buildings[21].manual, false), algebraPower: displayNum(Math.round(player.mult[4] * globalMult[4]), false),
										designSchoolOwned: displayNum(player.buildings[22].owned, false), designSchoolCost: displayNum(player.buildings[22].proofCost, true), designSchoolManual: displayNum(player.buildings[22].manual, false), designSchoolPower: displayNum(Math.round(3 * player.mult[4] * globalMult[4]), false),
										researchScientistOwned: displayNum(player.buildings[23].owned, false), researchScientistCost: displayNum(player.buildings[23].moneyCost, true), researchScientistManual: displayNum(player.buildings[23].manual, false), researchScientistPower: displayNum(Math.round(player.mult[4] * globalMult[4]), false),
										carlGaussOwned: displayNum(player.buildings[24].owned, false), carlGaussCost: displayNum(player.buildings[24].moneyCost, true), carlGaussManual: displayNum(player.buildings[24].manual, false), carlGaussPower: displayNum(Math.round(player.mult[4] * globalMult[4]), false),
										clicksToGain: player.clicksToGain, buildingPeriod: player.buildingInterval});
										
	var row6 = row6Template({deriv6Owned: displayNum(player.buildings[25].owned, false), deriv6MoneyCost: displayNum(player.buildings[25].moneyCost, true), deriv6ProofCost: displayNum(player.buildings[25].proofCost, true), deriv6Manual: displayNum(player.buildings[25].manual, false), deriv6Power: displayNum(Math.round(player.mult[5] * globalMult[5]), false),
										geometryOwned: displayNum(player.buildings[26].owned, false), geometryCost: displayNum(player.buildings[26].moneyCost, true), geometryManual: displayNum(player.buildings[26].manual, false), geometryPower: displayNum(Math.round(player.mult[5] * globalMult[5]), false),
										deanArchitectureOwned: displayNum(player.buildings[27].owned, false), deanArchitectureCost: displayNum(player.buildings[27].proofCost, true), deanArchitectureManual: displayNum(player.buildings[27].manual, false), deanArchitecturePower: displayNum(Math.round(3 * player.mult[5] * globalMult[5]), false),
										labManagerOwned: displayNum(player.buildings[28].owned, false), labManagerCost: displayNum(player.buildings[28].moneyCost, true), labManagerManual: displayNum(player.buildings[28].manual, false), labManagerPower: displayNum(Math.round(player.mult[5] * globalMult[5]), false),
										leonhardEulerOwned: displayNum(player.buildings[29].owned, false), leonhardEulerCost: displayNum(player.buildings[29].moneyCost, true), leonhardEulerManual: displayNum(player.buildings[29].manual, false), leonhardEulerPower: displayNum(Math.round(player.mult[5] * globalMult[5]), false),
										clicksToGain: player.clicksToGain, buildingPeriod: player.buildingInterval});
										
	var row7 = row7Template({deriv7Owned: displayNum(player.buildings[30].owned, false), deriv7MoneyCost: displayNum(player.buildings[30].moneyCost, true), deriv7ProofCost: displayNum(player.buildings[30].proofCost, true), deriv7Manual: displayNum(player.buildings[30].manual, false), deriv7Power: displayNum(Math.round(player.mult[6] * globalMult[6]), false),
										arithmeticOwned: displayNum(player.buildings[31].owned, false), arithmeticCost: displayNum(player.buildings[31].moneyCost, true), arithmeticManual: displayNum(player.buildings[31].manual, false), arithmeticPower: displayNum(Math.round(player.mult[6] * globalMult[6]), false),
										chancellorOwned: displayNum(player.buildings[32].owned, false), chancellorCost: displayNum(player.buildings[32].proofCost, true), chancellorManual: displayNum(player.buildings[32].manual, false), chancellorPower: displayNum(Math.round(3 * player.mult[6] * globalMult[6]), false),
										researchLabOwned: displayNum(player.buildings[33].owned, false), researchLabCost: displayNum(player.buildings[33].moneyCost, true), researchLabManual: displayNum(player.buildings[33].manual, false), researchLabPower: displayNum(Math.round(player.mult[6] * globalMult[6]), false),
										isaacNewtonOwned: displayNum(player.buildings[34].owned, false), isaacNewtonCost: displayNum(player.buildings[34].moneyCost, true), isaacNewtonManual: displayNum(player.buildings[34].manual, false), isaacNewtonPower: displayNum(Math.round(player.mult[6] * globalMult[6]), false),
										clicksToGain: player.clicksToGain, buildingPeriod: player.buildingInterval});
	
	$("#firstRows").html(firstRows);
	if(ifUnlockedTier(5)) $("#row5").html(row5);
	else $("#row5").html(null);
	if(ifUnlockedTier(6)) $("#row6").html(row6);
	else $("#row6").html(null);
	if(ifUnlockedTier(7)) $("#row7").html(row7);
	else $("#row7").html(null);
	
	//updates whether buttons are lit using a list of buttons	
	buttonList = jQuery.makeArray($("#tableContainer div table tr .button"));
	
	if(player.numToBuy == "Max"){
		for(var i = 0; i < buttonList.length; i++){
			if(player.money < player.buildings[i].moneyCost || player.proofs < player.buildings[i].proofCost){
				buttonList[i].className = "button";
			}
			else{
				buttonList[i].className = "buttonLit";
			}
		}
	}
	else{
		for(var i = 0; i < buttonList.length; i++){
			var moneyCost = calcTotalPrice(player.buildings[i].moneyCost, player.buildings[i].factor, player.numToBuy);
			var proofCost = calcTotalPrice(player.buildings[i].proofCost, player.buildings[i].factor, player.numToBuy);
			if(player.money < moneyCost || player.proofs < proofCost){
				buttonList[i].className = "button";
			}
			else{
				buttonList[i].className = "buttonLit";
			}
		}
	}
}

function updateStats(){
	var newStats = statsTemplate({totalMoneyEarned: displayNum(player.totalMoneyEarned, true), totalProofs: displayNum(player.totalProofs, false),
								totalClicks: displayNum(player.totalClicks, false), totalManualClicks: displayNum(player.totalManualClicks, false), 
								totalTicks: displayNum(player.totalTicks, false), timeMult: displayNum(player.timeMult, false)});
  
	$("#statContainer").html(newStats);
}

function updatePrestige(){
	var newPrestige = prestigeTemplate({tier1Resets: player.numResets[0], tier1ResetCurr: displayNum(player.resetCurr[0], false), tier1GlobalMult: displayNum(globalMult[0], false), tier1CurrTracker: displayNum(player.resetCurrTracker, false),
										tier2Resets: player.numResets[1], tier2ResetCurr: displayNum(player.resetCurr[1], false), tier2GlobalMult: displayNum(globalMult[1], false), tier2CurrTracker: displayNum(Math.floor(player.resetCurr[0] / player.resetCurrFactor), false),
										tier3Resets: player.numResets[2], tier3ResetCurr: displayNum(player.resetCurr[2], false), tier3GlobalMult: displayNum(globalMult[2], false), tier3CurrTracker: displayNum(Math.floor(player.resetCurr[1] / player.resetCurrFactor), false),
										tier4Resets: player.numResets[3], tier4ResetCurr: displayNum(player.resetCurr[3], false), tier4GlobalMult: displayNum(globalMult[3], false), tier4CurrTracker: displayNum(Math.floor(player.resetCurr[2] / player.resetCurrFactor), false),
										tier5Resets: player.numResets[4], tier5ResetCurr: displayNum(player.resetCurr[4], false), tier5GlobalMult: displayNum(globalMult[4], false), tier5CurrTracker: displayNum(Math.floor(player.resetCurr[3] / player.resetCurrFactor), false),
										tier6Resets: player.numResets[5], tier6ResetCurr: displayNum(player.resetCurr[5], false), tier6GlobalMult: displayNum(globalMult[5], false), tier6CurrTracker: displayNum(Math.floor(player.resetCurr[4] / player.resetCurrFactor), false),
										proofsToNextCurr: displayNum(player.proofsToNextCurr, false), mathematiciansToNextCurr: displayNum(player.mathematiciansToNextCurr, false)});
	$("#prestige").html(newPrestige);
}

function updateResetCurrBuyables(){
    var buttonListProto = jQuery.makeArray($("#resetCurrTable tr td .button, #resetCurrTable tr td .buttonLit"));
    var buttonList = new Array(buttonListProto.length);
    for(i = 0; i < buttonListProto.length; i++){ //reorder elements to be in data order instead of DOM order
        buttonList[(i%4)*6 + Math.floor(i/4)] = buttonListProto[i];
    }
    
    if(typeof this.originalTitles == "undefined"){ //stores original titles of buttons
        this.originalTitles = new Array(buttonList.length);
        for(var i = 0; i < buttonList.length; i++) this.originalTitles[i] = buttonList[i].title;
    }
    
    for(var i = 0; i < buttonList.length; i++){
        buttonList[i].title = this.originalTitles[i];
        if (player.currBuyables[i].owned){
            buttonList[i].innerHTML = "X";
            buttonList[i].title += "<div class='strong'>Owned</div>";
            buttonList[i].className = "button";
            continue;
        } 
        if (i % 6 != 0){
            if(!player.currBuyables[i - 1].owned){
                buttonList[i].title += "<div class='strong'>Not unlocked</div>";
                continue;
            }
        }
        var afford = true;
        for (var j = 0; j < numTiers - 1; j++){
            if (player.resetCurr[j] < player.currBuyables[i].cost[j]){
                afford = false;
                buttonList[i].className = "button";
                break;
            }
        }
        if(!afford) continue;
        
        buttonList[i].className = "buttonLit";
    }
}

function ifUnlockedTier(tier){
	return player.currBuyables[tier - 5].owned;
}

function updateUpgrades(){
	var newUpgrades = upgradesTemplate({tier1UpgradeCost: displayNum(player.tierUpgradeCosts[0], true), tier1UpgradeOwned: displayNum(player.tierUpgrades[0], false), tier1Mult: displayNum(player.mult[0], false),
										tier2UpgradeCost: displayNum(player.tierUpgradeCosts[1], true), tier2UpgradeOwned: displayNum(player.tierUpgrades[1], false), tier2Mult: displayNum(player.mult[1], false),
										tier3UpgradeCost: displayNum(player.tierUpgradeCosts[2], true), tier3UpgradeOwned: displayNum(player.tierUpgrades[2], false), tier3Mult: displayNum(player.mult[2], false),
										tier4UpgradeCost: displayNum(player.tierUpgradeCosts[3], true), tier4UpgradeOwned: displayNum(player.tierUpgrades[3], false), tier4Mult: displayNum(player.mult[3], false),
										tier5UpgradeCost: displayNum(player.tierUpgradeCosts[4], true), tier5UpgradeOwned: displayNum(player.tierUpgrades[4], false), tier5Mult: displayNum(player.mult[4], false),
										tier6UpgradeCost: displayNum(player.tierUpgradeCosts[5], true), tier6UpgradeOwned: displayNum(player.tierUpgrades[5], false), tier6Mult: displayNum(player.mult[5], false),
										tier7UpgradeCost: displayNum(player.tierUpgradeCosts[6], true), tier7UpgradeOwned: displayNum(player.tierUpgrades[6], false), tier7Mult: displayNum(player.mult[6], false),
										autoclickerCost: displayNum(player.upgradeCosts[0], true), autoclickerOwned: displayNum(player.upgrades[0], false), autoclickInterval: player.autoclickInterval,
										manualClickBoosterCost: displayNum(player.upgradeCosts[1], true), manualClickBoosterOwned: displayNum(player.upgrades[1], false), clickPower: displayNum(player.clickPower, false)});
	
	$("#upgrades").html(newUpgrades);
	
	//hides rows if upgrades aren't unlocked
	if(!ifUnlockedTier(5)) $("#tier5UpgradeRow").css('display', 'none');
	else $("#tier5UpgradeRow").css('display', 'table-row');
	if(!ifUnlockedTier(6)) $("#tier6UpgradeRow").css('display', 'none');
	else $("#tier6UpgradeRow").css('display', 'table-row');
	if(!ifUnlockedTier(7)) $("#tier7UpgradeRow").css('display', 'none');
	else $("#tier7UpgradeRow").css('display', 'table-row');
	
	buttonList = jQuery.makeArray($("#upgradesTable tr .button"));
	
	if(player.numToBuy == "Max"){
    	for(var i = 0; i < numTiers; i++){
    		if(player.money < player.tierUpgradeCosts[i]){
    			buttonList[i].className = "button";
    		}
    		else{
    			buttonList[i].className = "buttonLit";
    		}
    	}
    	for(var i = 0; i < 2; i++){
    		if(player.money < player.upgradeCosts[i]){
    			buttonList[i + numTiers].className = "button";
    		}
    		else{
    			buttonList[i + numTiers].className = "buttonLit";
    		}
    	}
    }
    else{
        for(var i = 0; i < numTiers; i++){
            var cost = calcTotalPrice(player.tierUpgradeCosts[i], 1000, player.numToBuy);
            if(player.money < cost){
                buttonList[i].className = "button";
            }
            else{
                buttonList[i].className = "buttonLit";
            }
        }
        for(var i = 0; i < 2; i++){
            var cost = calcTotalPrice(player.upgradeCosts[i], upgradeCostFactor[i], player.numToBuy);
            if(player.money < cost){
                buttonList[i + numTiers].className = "button";
            }
            else{
                buttonList[i + numTiers].className = "buttonLit";
            }
        }
    }
}

function updateAll(){
    updateMoney();
    updateInventory();
    updateUpgrades();
    updateStats();
    updatePrestige();
    updateResetCurrBuyables();
}

//this is a function to click the money button: allows auto button clicking
function moneyButtonClick(amount) {
	var ifUpdate = false;
	addMoney(player.moneyPerClick * amount);
	player.clickTracker += amount;
	player.totalClicks += amount;
	if(player.clickTracker < 5000 * player.clicksToGain){ //while loop gets executed max 5000 times
    	while(player.clickTracker >= player.clicksToGain){
    		var toAdd = Math.round(player.buildings[8].owned * player.mult[1] * globalMult[1])
    		player.clickTracker -= player.clicksToGain;
    		addMoneyPerClick(0.1 * player.mult[0] * toAdd * globalMult[0]);
    		for(var i = 0; i < numTiers - 1; i++){
    			player.buildings[5*i + 3].owned += Math.round(player.buildings[5*(i+1) + 3].owned*player.mult[i+1]*globalMult[i+1]);
    		}
    	}
    	ifUpdate = true;
    }
    else{ //removes iterative component for large numbers
        var toAdd = Math.round(player.buildings[8].owned * player.mult[1] * globalMult[1] * Math.floor(amount / player.clicksToGain));
        player.clickTracker = amount % player.clicksToGain;
        addMoneyPerClick(0.1 * player.mult[0] * toAdd * globalMult[0]);
        for(var i = 0; i < numTiers - 1; i++){
            player.buildings[5*i + 3].owned += Math.round(player.buildings[5*(i+1) + 3].owned*player.mult[i+1]*globalMult[i+1] * Math.floor(amount / player.clicksToGain));
        }
        ifUpdate = true;
    }
        
	player.moneyPerAutoclick = player.upgrades[0] * player.moneyPerClick;
	updateMoney();
	if(ifUpdate) updateInventory();
}

function versionControl(ifImport){
	//resets if the current version is incompatible with the savefile
	if(player.versionNum < 0.22){
		if(ifImport){
			alert("This save is incompatible with the current version.");
			return;
		}
		alert("Your save has been wiped as part of an update. Sorry for the inconvenience.\nWipe goes with: version " + 0.22);
		init();
		localStorage.setItem("playerStored", JSON.stringify(player));
		return;
	}
	if(player.versionNum < 0.3){
		player.clicksToGain = 25;
		player.upgrades[1] = 0;
		player.upgradeCosts[1] = 10000000;
	}
	if(player.versionNum < 0.32){
		var set = false;
		if(player.currBuyables[11].owned){
			player.clicksToGain = 4;
			set = true;
		}
		if(player.currBuyables[10].owned && !set){
			player.clicksToGain = 6;
			set = true;
		}
		if(player.currBuyables[9].owned && !set){
			player.clicksToGain = 8;
			set = true;
		}
		if(player.currBuyables[8].owned && !set){
			player.clicksToGain = 11;
			set = true;
		}
		if(player.currBuyables[7].owned && !set){
			player.clicksToGain = 15;
			set = true;
		}
		if(player.currBuyables[6].owned && !set){
			player.clicksToGain = 20;
			set = true;
		}
		if(!set){
			player.clicksToGain = 25;
		}
	}
	if(player.versionNum < versionNum || typeof player.versionNum == 'undefined'){
		player.versionNum = versionNum;
	}
}

//things that run on startup: moneybutton initialization, tabs, initial DOM updates, load save
$(document).ready(function(){
	$("#tabs").tabs({show:{effect: "slideDown"}}, {hide:{effect: "slideUp"}});
  
	if(localStorage.getItem("playerStored") != null) load();
	if(typeof enableChart == 'undefined') enableChart = true;
	if(!enableChart) $("#chartStuff").toggle();
	
	versionControl(false);
	
	if(player.upgrades[1] == 24) player.upgradeCosts[1] = Infinity; //deals with JSON's incompatibility with Infinity
	
	$("#version").html(player.versionNum);

	$("#currentNumToBuy").html(player.numToBuy);
	$("#currentNumToBuy2").html(player.numToBuy);
	$("#minTickLength").html(player.minTickLength);
	
	$("#resetCurrTable tr td .buttonLit, #resetCurrTable tr td .button").tooltip({show: false, hide: false, content: function () {
    	return this.getAttribute("title");
	}});

	for(i = 1; i <= numTiers; i++){
		calcMult(i);
	}
	calcGlobalMult();
	
    updateAll();
  
	$("#moneyButton").click(function(){
		moneyButtonClick(player.clickPower);
		player.totalManualClicks += player.clickPower;
	});
});

//function to buy buildings: onclick events

function buyBuilding(index){
	var numToBuy, moneyCost, proofCost;
	if(player.numToBuy == "Max"){
		var numToBuy = 0;
		while(calcTotalPrice(player.buildings[index].moneyCost, player.buildings[index].factor, numToBuy) <= player.money && Math.round(calcTotalPrice(player.buildings[index].proofCost, player.buildings[index].factor, numToBuy)) <= player.proofs){
			numToBuy++;
		}
		numToBuy--;
	}
	else numToBuy = player.numToBuy;
	
	if(numToBuy <= 0) return;
	
	moneyCost = calcTotalPrice(player.buildings[index].moneyCost, player.buildings[index].factor, numToBuy);
	proofCost = Math.round(calcTotalPrice(player.buildings[index].proofCost, player.buildings[index].factor, numToBuy));
	
	if(player.money >= moneyCost && player.proofs >= proofCost){
		
		player.buildings[index].owned += numToBuy;
		player.buildings[index].manual += numToBuy;
			
		addMoney(-moneyCost);
		player.proofs -= proofCost;
			
		player.buildings[index].moneyCost = Math.round((player.buildings[index].moneyCost * Math.pow(player.buildings[index].factor, numToBuy))*100)/100;
		player.buildings[index].proofCost = Math.round(player.buildings[index].proofCost * Math.pow(player.buildings[index].factor, numToBuy));
		
		calcMult(Math.ceil(index/5.0 + 0.1)); //picks the right multiplier based on the index
		switch(index){
			case 0: //deriv1
				addMoneyPerSecond(player.deriv1Money * player.mult[0] * numToBuy * globalMult[0]);
				addNetMoneyPerSecond(player.deriv1Money * player.mult[0] * numToBuy * globalMult[0]);
				break;
			case 1: //combinatorics
				player.proofsPerSecond += 1 * player.mult[0] * numToBuy * globalMult[0];
				player.proofsPerSecond = Math.floor(player.proofsPerSecond);
				addNetMoneyPerSecond(-player.costPerProof * player.mult[0] * numToBuy * globalMult[0]);
				break;
			case 2: //computer
				addMoneyPerSecond(2 * player.mult[0] * numToBuy * globalMult[0]);
				addNetMoneyPerSecond(2 * player.mult[0] * numToBuy * globalMult[0]);
				break;
			case 3: //high schooler
				addMoneyPerClick(0.1 * player.mult[0] * numToBuy * globalMult[0]);
				break;
			case 4: //mathematician
				player.mathematiciansToNextCurr -= numToBuy;
			default:
				break;
		}
	}
	updateMoney();
	updateInventory();
}			
  
//function to buy upgrades: onclick events

function buyTierUpgrade(index){
    var numToBuy, cost;
    if(player.numToBuy == "Max"){
        var numToBuy = 0;
        while(calcTotalPrice(player.tierUpgradeCosts[index], 1000, numToBuy) <= player.money){
            numToBuy++;
        }
        numToBuy--;
    }
    else numToBuy = player.numToBuy;
    
    if(numToBuy <= 0) return;
    
    cost = calcTotalPrice(player.tierUpgradeCosts[index], 1000, numToBuy);
    
	if(player.money >= cost){
		player.tierUpgrades[index]+= numToBuy;

		addMoney(-cost);
		player.tierUpgradeCosts[index] = Math.round((player.tierUpgradeCosts[index] * Math.pow(1000, numToBuy))*100)/100;
		calcMult(index + 1);
		
		updateUpgrades();
		updateMoney();
	}
}

function buyUpgrade(index) {
	var numToBuy, cost;
	if (player.numToBuy == "Max") {
		var numToBuy = 0;
		while (calcTotalPrice(player.upgradeCosts[index], upgradeCostFactor[index], numToBuy) <= player.money) {
			numToBuy++;
		}
		numToBuy--;
	} else numToBuy = player.numToBuy;

	if (numToBuy <= 0) return;

	cost = calcTotalPrice(player.upgradeCosts[index], upgradeCostFactor[index], numToBuy);

	if (player.money >= cost) {
		player.upgrades[index] += numToBuy;

		addMoney(-cost);
		player.upgradeCosts[index] = Math.round((player.upgradeCosts[index] * Math.pow(upgradeCostFactor[index], numToBuy)) * 100) / 100;

		if (index == 1)	player.clickPower += numToBuy;

		updateUpgrades();
		updateMoney();
	}
}

function buyCurrBuyable(index) {
	//conditions for buyable
	if (player.currBuyables[index].owned) return; //already owned
	if (index % 6 != 0){
		if(!player.currBuyables[index - 1].owned) return; //lower tier one not owned
	}
	for (var i = 0; i < numTiers - 1; i++) if (player.resetCurr[i] < player.currBuyables[index].cost[i]) return; //not enough curr

	player.currBuyables[index].owned = true;
	for (var i = 0; i < numTiers - 1; i++) player.resetCurr[i] -= player.currBuyables[index].cost[i];
	calcGlobalMult();

	switch(index) {
		case 3:
		case 4:
		case 5:	//factor reducers
			for (var i = 0; i < player.buildings.length; i++){
				player.buildings[i].factor = 1 + (player.buildings[i].factor - 1) / 1.1;
			}
			break;
		case 6:	//click improvers
			player.clicksToGain = 20;
			break;
		case 7:
			player.clicksToGain = 15;
			break;
		case 8:
			player.clicksToGain = 11;
			break;
		case 9:
			player.clicksToGain = 8;
			break;
		case 10:
			player.clicksToGain = 6;
			break;
		case 11:
			player.clicksToGain = 4;
			break;
		case 12: //building tick reducers
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
			player.buildingInterval -= 1;
			break;
		case 18: //autoclick tick reducers
		case 19:
		case 20:
			player.autoclickInterval -= 10;
			break;
		case 21: //reset currency conversion factor
		case 22:
		case 23:
			player.resetCurrFactor -= 1;
			break;
		default:
			break;
	}
	
	updatePrestige();
	updateResetCurrBuyables();
}

var update = function(){
	// update.count makes stuff happen every 3 ticks
	if(typeof update.count == 'undefined'){
		update.count = 0;
	}
	// update.count2 makes stuff happen every minute
	if(typeof update.count2 == 'undefined'){
		update.count2 = 0;
	}
	//intervalTracker fixes window minimization issues
	if(typeof update.intervalTracker == 'undefined'){
		update.intervalTracker = 0;
	}
	if(typeof update.before == 'undefined'){
		update.before = new Date();
	}
	
	var now = new Date();
	var elapsedTime = now.getTime() - update.before.getTime();
	
	update.intervalTracker += isActive ? 0 : elapsedTime;
	
	do{
		//adds money
		addMoney(player.buildings[0].owned * player.deriv1Money * player.mult[0] * globalMult[0] * player.timeMult);
		addMoney(player.buildings[2].owned * 2 * player.mult[0] * globalMult[0] * player.timeMult);
		
		//checks if enough money to add full amount of proofs: if so, adds proofs, otherwise, adds as many proofs as possible
		if(player.money >= player.buildings[1].owned * player.costPerProof * player.mult[0] * globalMult[0] * player.timeMult){
			addProofs(player.buildings[1].owned * player.mult[0] * globalMult[0] * player.timeMult);
		}
		else addProofs(Math.floor(player.money / player.costPerProof));
		
		//does stuff every buildingInterval ticks
		if(update.count >= player.buildingInterval){
			inventoryAdder(Math.floor(update.count / player.buildingInterval));
			update.count = update.count % player.buildingInterval;
		}
	
		//does stuff every autoclickInterval ticks
		if(update.count2 >= player.autoclickInterval){
			moneyButtonClick(player.upgrades[0] * Math.floor(update.count2 / player.autoclickInterval));
			update.count2 = update.count2 % player.autoclickInterval;
		}
		
		//checks if enough proofs/mathematicians for reset currency: if so, adds reset currency
		if(player.proofsToNextCurr > -10000 * Math.pow(10 * (10 + player.proofsToCurrTracker), 6)){
			while(player.proofsToNextCurr < 0){
				player.resetCurrTracker++;
				player.proofsToCurrTracker++;
				player.proofsToNextCurr += 10 * Math.pow(10 * (10 + player.proofsToCurrTracker), 6);
			}
		}
		else{
			var currToGain = Math.ceil(Math.pow(-player.proofsToNextCurr/(10000000/7) + Math.pow(10+player.proofsToCurrTracker, 7), 1/7)) - 10 - player.proofsToCurrTracker; //approximate reset curr gained without while loop
			if(-player.proofsToNextCurr > 1e106) currToGain += currToGain / 1e6; //deals with inaccuracy in numbering
			player.proofsToNextCurr += 10000000/7 * (Math.pow(10 + currToGain + player.proofsToCurrTracker, 7) - Math.pow(10 + player.proofsToCurrTracker - 1, 7));
			player.resetCurrTracker += currToGain;
			player.proofsToCurrTracker += currToGain;
		}
		
		if(player.mathematiciansToNextCurr > -7000000 * Math.pow(10 + player.mathematiciansToNextCurrTracker, 6)){
			while(player.mathematiciansToNextCurr < 0){
				player.resetCurrTracker++;
				player.mathematiciansToNextCurrTracker++;
				player.mathematiciansToNextCurr += 7000 * Math.pow(10 + player.mathematiciansToNextCurrTracker, 6)
			}
		}
		else{
			var currToGain = Math.ceil(Math.pow(-player.mathematiciansToNextCurr/1000 + Math.pow(10+player.mathematiciansToNextCurrTracker, 7), 1/7)) - 10 - player.mathematiciansToNextCurrTracker; //approximate reset curr gained without while loop
			player.mathematiciansToNextCurr += 1000 * (Math.pow(10 + currToGain + player.mathematiciansToNextCurrTracker, 7) - Math.pow(10 + player.mathematiciansToNextCurrTracker - 1, 5));
			player.resetCurrTracker += currToGain;
			player.mathematiciansToNextCurrTracker += currToGain;
		}
		
		//recalculates money/proofs per tick
		player.moneyPerClick = ((player.buildings[3].owned * player.mult[0] * 0.1) + 1) * globalMult[0];
		player.moneyPerSecond = (((player.buildings[0].owned * player.deriv1Money * player.mult[0]) + (player.buildings[2].owned * 2 * player.mult[0])) * globalMult[0]);
		player.proofsPerSecond = Math.round(player.buildings[1].owned * player.mult[0] * globalMult[0]);
		player.netMoneyPerSecond = player.moneyPerSecond - (player.proofsPerSecond * player.costPerProof);
		player.moneyPerAutoclick = player.upgrades[0] * player.moneyPerClick;
		
		update.count += player.timeMult;
		update.count2 += player.timeMult;
		player.totalTicks += player.timeMult;
		
		player.updateInterval = 1000 * Math.pow(0.98, Math.log(player.buildings[4].owned * player.mult[0] * globalMult[0] + 1));
		
		//this fixes minimization by running until the interval tracker is less than 0 if the thing isn't active
		if(!isActive) update.intervalTracker -= player.updateInterval * player.timeMult;
		
	}while(!isActive && update.intervalTracker > 0 && elapsedTime > player.updateInterval);
	
	//checks active tab, updates appropriate things
	var activeTab = $("#tabs").tabs("option", "active");
	switch(activeTab){
		case 0:
			updateInventory();
			break;
			
		case 1:
			updateUpgrades();
			break;
		
		case 2:
			updatePrestige();
			break;
		
		case 4:
			updateStats();
			break;
	}
	updateMoney();
	
	update.before = new Date();
	
	while(player.updateInterval * player.timeMult < player.minTickLength) player.timeMult *= 1000 / player.minTickLength; //sets up time multiplier if game's ticking too fast
	
	setTimeout(update, player.updateInterval * player.timeMult);
}
//stuff that happens each tick
setTimeout(update, player.updateInterval * player.timeMult);

setInterval(save, 60000);

//stuff that happens every ten ticks (i.e. inventory additions)
function inventoryAdder(amount){
    if(amount < 250){
        while(amount > 0){
        	player.mathematiciansToNextCurr -= Math.round(player.buildings[9].owned * player.mult[1] * globalMult[1]);
        	
        	for(var i = 0; i < player.buildings.length - 5; i++){
        		switch(i % 5){
        			case 0:
        			case 1:
        			case 4:
        				player.buildings[i].owned += Math.round(player.buildings[i+5].owned * player.mult[Math.floor(i/5) + 1] * globalMult[Math.floor(i/5) + 1]);
        				break;
        			case 2:
        				player.buildings[i].owned += Math.round(3 * player.buildings[i+5].owned * player.mult[Math.floor(i/5) + 1] * globalMult[Math.floor(i/5) + 1]);
        				break;
        			default:
        				break;
        		}
        	}
        	amount--;
        }
    }
    else{
        player.mathematiciansToNextCurr -= Math.round(player.buildings[9].owned * player.mult[1] * globalMult[1] * amount);
        
        for(var i = 0; i < player.buildings.length - 5; i++){
            switch(i % 5){
                case 0:
                case 1:
                case 4:
                    player.buildings[i].owned += Math.round(player.buildings[i+5].owned * player.mult[Math.floor(i/5) + 1] * globalMult[Math.floor(i/5) + 1]) * amount;
                    break;
                case 2:
                    player.buildings[i].owned += Math.round(3 * player.buildings[i+5].owned * player.mult[Math.floor(i/5) + 1] * globalMult[Math.floor(i/5) + 1]) * amount;
                    break;
                default:
                    break;
                    
            }
        }
    }
}
