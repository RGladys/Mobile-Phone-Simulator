(function(){

var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var unlockCondition,
x,
y,
startX,
startY,
startClock = $j("#startClock"),
startSVG = $j("#startSVG"),
startHour = $j("#startHour"),
startDay = $j("#startDay"),
barTime = $j("#barTime");

//CLOCK
function clock(){
	startHour.text(`${timeObject.hour}:${timeObject.minute}`);
	startDay.text(`${week[timeObject.day]}, ${months[timeObject.month]} ${timeObject.day2}`);
	barTime.text(`${timeObject.hour}:${timeObject.minute}`);
};
clock();
setInterval(clock, 10000)

//START SCREEN
//Unlock
startSVG.on("mousemove", particles);

startSVG.on("mousedown", particle)

$j(document).on("mouseup", function(){
	unlockCondition = false;
	startX = 0;
	startY = 0;
});


function particle(e){
	startX = e.clientX-(jqElements.canvas.width()/2.9 + jqElements.canvas.offset().left);
	startY = e.clientY-(jqElements.canvas.height()/7 + jqElements.canvas.offset().top);
	unlockCondition = true;
	d3.select("#startSVG")
				.append("circle", "rect")
				.attr("cx", startX)
				.attr("cy", startY)
				.attr("r", 0)
				.attr("stroke", "white")
				.attr("stroke-width", 10)
				.attr("fill", "none")
				.transition()
					.duration(1000)
					.ease(Math.sqrt)
					.attr("r", 60)
					.attr("stroke", "rgba(255, 255, 255, 0)")
					.attr("stroke-width", 2)
					.remove()
};

function particles(e){
	x = e.clientX-(jqElements.canvas.width()/2.9 + jqElements.canvas.offset().left);
	y = e.clientY-(jqElements.canvas.height()/7 + jqElements.canvas.offset().top);
	if (unlockCondition){
		if (Math.random()>.9) {
			d3.select("#startSVG")
				.append("circle", "rect")
				.attr("cx", x)
				.attr("cy", y)
				.attr("r", 0)
				.attr("stroke", "white")
				.attr("stroke-width", 10)
				.attr("fill", "none")
				.transition()
					.duration(1000)
					.ease(Math.sqrt)
					.attr("r", 60)
					.attr("stroke", "rgba(255, 255, 255, 0)")
					.attr("stroke-width", 2)
					.remove()
				};
			if (Math.abs(x-startX) + Math.abs(y-startY) > 120) {
				jqElements.start.fadeOut(500);
				jqElements.menu.fadeIn(500);
				stateMap.startStatus = false;
			}
		}

//MENU
function menuFade(){
	jqElements.menu.fadeOut(100);
	$j("#" + $j(this).attr('data')).fadeIn(100);
	stateMap.layer = 0;
};

function iconDown(){
	$j(this).css("opacity", "0.5");
};

function iconUp(){
	$j(this).css("opacity", "1")
};

jqElements.icon.on("click", menuFade);
jqElements.icon.on("mousedown", iconDown);
jqElements.icon.on("mouseup", iconUp);
jqElements.icon.on("mousemove", iconUp)
};
})()
