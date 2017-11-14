(function(){

var current,
slider = $j("#gallerySlider"),
arrowBack = $j("#galleryPrev"),
arrowNext = $j("#galleryNext"),
galleryPhoto = $j(".galleryPhoto");

//Assigning miniatures
for (var i=1; i<=8; i++) {
  $j("#gallery" + i).css('backgroundImage', 'url(images/pictures/min/min' + i + '.png)');
};

//Clicking on a miniature
function galleryClick() {
  stateMap.layer = 1;
  current = Number($j(this).attr("data"));
  slider.css({"background-image": "url(images/pictures/picture" + current + ".png)", "display": "block"});
  jqElements.arrows.css("display", "block")
};
galleryPhoto.on("click", galleryClick);

//Prev and next arrows
function galleryPrev() {
  if (current>1) {
    current -= 1;
    slider.css("background-image", "url(images/pictures/picture" + current + ".png)")
  }
};
arrowBack.on("click", galleryPrev);

function galleryNext() {
  if (current<8) {
    current += 1;
    slider.css("background-image", "url(images/pictures/picture" + current + ".png)");
  }
};
arrowNext.on("click", galleryNext);

//Arrows visibility
function arrowsFn() {
  if (stateMap.slider) {
    jqElements.arrows.stop().fadeIn(250);
    stateMap.slider = false
  } else {
    jqElements.arrows.stop().fadeOut(250);
    stateMap.slider = true
  }
};
slider.on("click", arrowsFn)


})()
