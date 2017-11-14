(function(){

var currentBg,
main = $j("#settings"),
background = $j("#settingsBg"),
sounds = $j("#settingsSounds"),
backgroundMin = $j(".settingsPhoto"),
backgroundSetIcon = $j("#settingsBgSet1, #settingsBgSet2"),
sound = $j(".settingsSound");

//Assigning background miniatures
for (var i=1; i<=8; i++) {
  $j("#settingBgGallery" + i).css('backgroundImage', 'url(images/pictures/min/min' + i + '.png)');
};

//Clicking background setting
function backgroundFn() {
  jqElements.settingsBgMain.css("display", "block");
  stateMap.layer = 1;
};
background.on("click", backgroundFn);

//Clicking background miniature
function backgroundMinFn() {
  stateMap.layer = 2;
  currentBg = Number($j(this).attr("data"));
  jqElements.settingsBgPhoto.css({"background-image": "url(images/pictures/picture" + currentBg + ".png)", "display": "block"});
};
backgroundMin.on("click", backgroundMinFn);

//Setting background
function backgroundSet() {
  stateMap.layer = 1;
  jqElements.settingsBgPhoto.css("display", "none")
  if ($j(this).attr("data") == 1) {
    jqElements.start.css("background-image", "url(images/pictures/picture" + currentBg + ".png)")
  } else {
    jqElements.menu.css("background-image", "url(images/pictures/picture" + currentBg + ".png)")
  }
};
backgroundSetIcon.on("click", backgroundSet);

//Clicking sound setting
function soundsFn() {
  jqElements.settingsSoundsMain.css("display", "block");
  stateMap.layer = 1;
};
sounds.on("click", soundsFn);

//Choosing sound
function choseSound(){
  $j(this).css("background", "#c9efd9");
  sound.not(this).css("background", "#f8f8f8");
  switch($j(this).attr("id")){
    case "settingsSoundMarimba":
      ringSound = new Audio('/audio/marimba.wav');
      ringSound.play();
      break;
      case "settingsSoundNone":
        ringSound = null;
        break;
  }
};
sound.on("click", choseSound)

})()
