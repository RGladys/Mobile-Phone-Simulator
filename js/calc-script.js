methods.calcReset = (function(){

var calcButton = $j(".calcButton"),
display = $j("#calcDisplay");
//Buttons
function calcIconUp(){
	$j(this).css("background-color", "#d6d6d6")
};
calcButton.on("mousedown", function(){
	$j(this).css("background-color", "darkgrey")
});

calcButton.on("mouseup", calcIconUp);
calcButton.on("mousemove", calcIconUp);

function calcReset(){
	display.text("");
	stateMap.coma = true;
}
//Write numbers
calcButton.on("click", function(){
	if (display.text().length < 12){
		display.append($j(this).attr("data"));
		if ($j(this).attr("id") == "calcComa" && stateMap.coma) {
				display.append(".");
				stateMap.coma = false;
			}
	};
	if ($j(this).attr("id") == "calcClear") {
		calcReset();
		stateMap.memory = ""
	};
	if ($j(this).attr("id") == "calcClearLast") {
		var calcString = display.text();
		display.text(calcString.substring(0, calcString.length-1));
	};
	if ($j(this).attr("data-type") == "calcAction") {
		var calcString = display.text();
		if (Number(calcString.substring(calcString.length-1)) || (calcString.substring(calcString.length-1)) == "0") {
			stateMap.memory += display.text() + $j(this).text();
			calcReset();
		}
	};
	if ($j(this).attr("id") == "calcResult") {
		stateMap.memory += display.text()
		if ((eval(stateMap.memory)).toString().length > 10) {
			display.text(eval(stateMap.memory).toPrecision(10));
		} else {
			display.text(eval(stateMap.memory));
		};
		stateMap.memory = "";
		stateMap.coma = false;
	}
});

return calcReset
})()
