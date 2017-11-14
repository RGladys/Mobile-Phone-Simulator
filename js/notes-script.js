(function(){

var container = $j("#notesContainer"),
notesArr = [],
notes = $j("#notes");

//Add "add" icon
function icon(){
  jqElements.addIcon.css("display", "block");
};
$j("#iconNotes").on("click", icon);

//Add new notes
function add() {
  stateMap.layer = 1;
  jqElements.addIcon.css("display", "none");
  var id = (Math.floor(Math.random()*10000000)).toString();

  //Check the limit
  if (notesArr.length >= 10){
    $j(`#note${notesArr[9]}, #${notesArr[9]}`).remove();
    notesArr.pop()
  };
  notesArr.push(id);

  //Add note shortcut
  container.append(
    `<div class=note id=note${id} data=${id}>
      <p class=noteText id=text${id}></p>
      <div class=noteDelete id=delete${id} data=${id}></div>
      <p class=noteDate>${timeObject.day2}.${timeObject.month}.${timeObject.year}</p>
    </div>`);

  //Add note editor
  jqElements.noteContainerFull.append(
    `<div class=noteFull id=${id}>
      <p>${timeObject.day2}.${timeObject.month}.${timeObject.year}</p>
      <textarea class=noteInput maxlength=350 id=input${id} data=${id}></textarea>
    </div>`);

  //Focus on textarea
  $j(`#input${id}`).focus();
};

//Note editor focus event
$j(notes).on("click", ".noteInput", function() {
  $j(this).focus()
});

//Note editor keydown event
$j(notes).on("keyup", ".noteInput", function() {
  if ($j(this).val().length < 13) {
    $j(`#text${$j(this).attr("data")}`).text($j(this).val())
  } else {
    if ($j(this).val().slice(12,13) != " ") {
    $j(`#text${$j(this).attr("data")}`).text($j(this).val().slice(0, 13) + "...")
  } else {
    $j(`#text${$j(this).attr("data")}`).text($j(this).val().slice(0, 12) + "...")
  }
  };
});

//Note shortcut event
$j(notes).on("click", ".note", function() {
  var id = "#" + $j(this).attr("data");
  jqElements.noteContainerFull.css("display", "block");
  $j(id).css("display", "block");
  if ($j(id).css("display") == "block"){
    jqElements.addIcon.css("display", "none");
    stateMap.layer = 1;
  };
});

//Delete note
$j(notes).on("click", ".noteDelete", function() {
  $j(`#note${$j(this).attr("data")}, #${$j(this).attr("data")}`).remove();
  var index = notesArr.indexOf($j(this).attr("data"));
  notesArr.splice(index, index++);
});

jqElements.addIcon.on("click", add);

})()
