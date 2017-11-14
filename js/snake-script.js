methods.snakeExit = (function(){
var snakeCanvas = document.getElementById("snakeCanvas");
var sctx = snakeCanvas.getContext("2d");
snakeCanvas.width = 260;
snakeCanvas.height = 380;

var snakeMove,
snakeAnimate,
snakeSpeed = 150,
main = $j("#snake"),
menu = $j("#snakeMenu"),
end = $j("#snakeEnd"),
btn = $j(".snakeBtn"),
score = $j(".snakeScore"),
hard = $j("#snakeHard"),
medium = $j("#snakeMedium"),
easy = $j("#snakeEasy"),
controls = $j(".snakeCtr");

//Button events
$j("#iconSnake").on("click", function(){
    menu.css("display", "block");
    $j("#bar").css("display", "none")
});

btn.on("click", function(){
  if($j(this).attr("data") == "play1"){
      stateMap.layer = 1;
      jqElements.snakeGame.css("display", "block");
      snakeMove=true;
      snake.blocks = [[130, 200], [130, 210], [130, 220]];
      snake.dir = "up";
      snake.score = 0;
      score.text(0);
      end.css("display", "none");
      snake.foodX = 10 * Math.floor(Math.random()*26);
      snake.foodY = 10 * Math.floor(Math.random()*38);
      clearInterval(snakeAnimate);
      snakeAnimate = setInterval(function(){snakeFunctions()}, snakeSpeed)
  };

  if($j(this).attr("data") == "settings"){
    stateMap.layer = 1;
    jqElements.snakeSettings.css("display", "block")
  };

  if($j(this).attr("data") == "play"){
    stateMap.layer = 1;
    end.css("display", "none");
    snake.blocks = [[130, 200], [130, 210], [130, 220]];
    snake.dir = "up";
    snake.score = 0;
    score.text(0);
    snakeMove = true;
    snake.foodX = 10 * Math.floor(Math.random()*26);
    snake.foodY = 10 * Math.floor(Math.random()*38);
  };
  if($j(this).attr("data") == "menu"){
    stateMap.layer = 0;
    jqElements.snakeGame.css("display", "none");
    jqElements.snakeSettings.css("display", "none");
    end.css("display", "none");
    menu.css("display", "block");
    clearInterval(snakeAnimate);
  };
  if ($j(this).attr("data") == "hard"){
    hard.css("background-color", "red");
    medium.css("background-color", "transparent");
    easy.css("background-color", "transparent");
    snakeSpeed = 80
  };
  if ($j(this).attr("data") == "medium"){
    hard.css("background-color", "transparent");
    medium.css("background-color", "red");
    easy.css("background-color", "transparent");
    snakeSpeed = 120
  };
  if ($j(this).attr("data") == "easy"){
    hard.css("background-color", "transparent");
    medium.css("background-color", "transparent");
    easy.css("background-color", "red");
    snakeSpeed = 200
  }
});

//Exit function - resets the game
function snakeExit(){
  snakeMove = false;
  main.children().css("display", "none");
  snake.blocks = [[130, 200], [130, 210], [130, 220]];
  snake.dir = "up";
  snake.score = 0;
  score.text(0);
  end.css("display", "none");
  clearInterval(snakeAnimate)
};

//Plane drawing
function snakePlane(){
  sctx.beginPath();
  sctx.fillStyle = "white";
  for (i=0;i<380;i+=10){
    for (j=0;j<260;j+=10){
      sctx.fillRect(j, i, 8, 8)
    };
  }
};

//Lose function
function snakeOver(){
  snakeMove = false;
  end.css("display", "block")
};

//Snake object
var snake = {
  foodX: 10 * Math.floor(Math.random()*26),
  foodY: 10 * Math.floor(Math.random()*38),
  dir: "up",
  grow: false,
  score: 0,
  blocks: [[130, 200], [130, 210], [130, 220]],
  draw(){
    sctx.beginPath();
    sctx.fillStyle = "black";
    for (i=0; i<this.blocks.length; i++){
      sctx.fillRect(this.blocks[i][0], this.blocks[i][1], 10, 10);
    }
  },
  move(){
    if (snakeMove) {
      if (!this.grow) this.blocks.pop();
      if (this.dir == "up") {
        this.blocks.unshift([(this.blocks[0][0]), (this.blocks[0][1]-10)])
      };
      if (this.dir == "down") {
        this.blocks.unshift([(this.blocks[0][0]), (this.blocks[0][1]+10)])
      };
      if (this.dir == "left") {
        this.blocks.unshift([(this.blocks[0][0]-10), (this.blocks[0][1])])
      };
      if (this.dir == "right") {
        this.blocks.unshift([(this.blocks[0][0]+10), (this.blocks[0][1])])
      };
    };
  },
  food(){
    sctx.fillRect(this.foodX, this.foodY, 10, 10);
    if (this.foodX == this.blocks[0][0] && this.foodY == this.blocks[0][1]){
      this.foodX = 10 * Math.floor(Math.random()*26);
      this.foodY = 10 * Math.floor(Math.random()*38);
      this.grow = true;
      this.score++;
      score.text(this.score)
    } else {
      this.grow = false
    }
  },
  collision(){
    if (this.blocks[0][0] > 250 || this.blocks[0][0] < 0 || this.blocks[0][1] > 370 || this.blocks[0][1] < 0) {
        snakeOver()
    };
    for (i=1;i<this.blocks.length;i++){
      if (this.blocks[0][0] == this.blocks[i][0] && this.blocks[0][1] == this.blocks[i][1]) {
        snakeOver()
      }
    }
  }
};

//Controller
controls.on("click", function(){
  var snakeDirection = $j(this).attr("data");
  if (snake.dir == "up" && snakeDirection == "left") snake.dir = "left";
  if (snake.dir == "up" && snakeDirection == "right") snake.dir = "right";
  if (snake.dir == "left" && snakeDirection == "down") snake.dir = "down";
  if (snake.dir == "left" && snakeDirection == "up") snake.dir = "up";
  if (snake.dir == "right" && snakeDirection == "down") snake.dir = "down";
  if (snake.dir == "right" && snakeDirection == "up") snake.dir = "up";
  if (snake.dir == "down" && snakeDirection == "left") snake.dir = "left";
  if (snake.dir == "down" && snakeDirection == "right") snake.dir = "right";
});



//Animation
function snakeFunctions(){
  sctx.clearRect(0, 0, canvas.width, canvas.height);
  snakePlane();
  snake.draw();
  snake.move();
  snake.food();
  snake.collision();
};

return snakeExit
})()
