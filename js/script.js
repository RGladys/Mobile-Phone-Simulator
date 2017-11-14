var $j = jQuery.noConflict();

var timeObject = {};
time();
setInterval(time, 10000);

var stateMap = {
	on: false,
	startStatus: true,
	coma: true,
	memory: "",
	slider: false,
	layer: false
};

var ringSound = new Audio('/audio/marimba.wav');

var jqElements = {
	canvas: $j("#canvas"),
	slider: $j("#gallerySlider"),
	arrows: $j(".galleryArrows"),
	icon: $j(".icon"),
	apps: $j("#screen").children().not("#bar"),
	start: $j("#start"),
	menu: $j("#menu"),
	bar: $j("#bar"),
	barMsg: $j("#msg"),
	messagesIcon: $j("#iconMessages"),
	messageContainer: $j("#messagesContainer"),
	settingsBg: $j("#settingsBgMain"),
	settingsBgPhoto: $j("#settingsBgPhoto"),
	settingsBgMain: $j("#settingsBgMain"),
	settingsSoundsMain: $j("#settingsSoundsMain"),
	snakeSettings: $j("#snakeSettingsMenu"),
	snakeGame: $j("#snakeGame"),
	noteContainerFull: $j("#notesContainerFull"),
	addIcon: $j("#notesAdd")
};

var methods = {
	back: function(){
		 switch(stateMap.layer) {
		   case 2:
			   stateMap.layer = 1;
		     jqElements.settingsBgPhoto.css("display", "none");
		     break;
		   case 1:
			   stateMap.layer = 0;
				 jqElements.messageContainer.children().css("display", "none");
				 jqElements.slider.css("display", "none");
		 		 jqElements.arrows.css("display", "none");
		 		 stateMap.slider = false;
		     jqElements.settingsBgMain.css("display", "none");
				 jqElements.settingsSoundsMain.css("display", "none");
				 jqElements.snakeSettings.css("display", "none");
				 jqElements.snakeGame.css("display", "none");
				 jqElements.noteContainerFull.children().css("display", "none");
				 jqElements.addIcon.css("display", "block");
		     break;
		   case 0:
			 	 stateMap.layer = false;
		     methods.button();
				 break;
		  }
	},
	button: function(){
		stateMap.memory = ""
		jqElements.apps.fadeOut(200);
		jqElements.menu.fadeIn(200);
		jqElements.slider.css("display", "none");
		jqElements.arrows.css("display", "none");
		jqElements.settingsBg.css("display", "none");
		jqElements.settingsSoundsMain.css("display", "none");
		jqElements.settingsBgPhoto.css("display", "none");
		stateMap.slider = false;
		methods.calcReset();
		methods.snakeExit();
		stateMap.layer = false;
		stateMap.memory = "";
		jqElements.bar.css("display", "block");
		$j(".messageFull").css("display", "none");
		$j("#messages").css("display", "none");
		$j(".noteFull").css("display", "none");
	},
	power: function(){
		if (!stateMap.on) {
			jqElements.start.css("display", "block");
			jqElements.bar.css("display", "block");
			stateMap.on = true
		} else {
			$j("#screen").children().css("display", "none");
			stateMap.startStatus = true;
			stateMap.on = false;
			stateMap.memory = "";
			jqElements.bar.css("display", "none");
			jqElements.slider.css("display", "none");
			jqElements.arrows.css("display", "none");
			jqElements.settingsBg.css("display", "none");
			jqElements.settingsBgPhoto.css("display", "none");
		};
	}
};
