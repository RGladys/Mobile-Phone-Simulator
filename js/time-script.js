var time = (function(){

return function(){
  var date = new Date()
	timeObject.hour = date.getHours();
	timeObject.minute = date.getMinutes();
	timeObject.day = date.getDay();
	timeObject.day2 = date.getDate();
	timeObject.month = date.getMonth();
  timeObject.year = date.getFullYear();
 	if (timeObject.hour.toString().length<2) {
		timeObject.hour = "0" + timeObject.hour
	};
	if (timeObject.minute.toString().length<2) {
		timeObject.minute = "0" + timeObject.minute
	};
}

})()
