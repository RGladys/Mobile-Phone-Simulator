(function(){

//Canvas
var canvas = document.getElementById("game"),
ctx = canvas.getContext("2d"),
game = $j("#game"),
icon = $j("#iconBall");
canvas.width = 285;
canvas.height = 502;

icon.on("click", function(){

jqElements.bar.css("display", "none");
	
//Ball
var ball = {
	posX: 140,
	posY: 100,
	g: .4,
	speedY: 0,
	speedX: 0,
	color: "black",
	draw: function(){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.posX, this.posY, 20, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath()
	},
	walls: function(){
		if (this.posY >= 480) {
			this.posY = 480;
			this.speedY = (-this.speedY * .44);
		};
		if (this.posY <= 20) {
			this.posY = 20;
			this.speedY = (-this.speedY * .44);
		};
		if (this.posX <= 18) {
			this.posX = 18;
			this.speedX = (-this.speedX * .44)
		};
		if (this.posX >= 264) {
			this.posX = 264;
			this.speedX = (-this.speedX * .44)
		};
	},
	gravity: function() {
		this.posY += this.speedY;
		this.posX += this.speedX;
		if (camera.rotation.z > -3.5 && camera.rotation.z < -1.6 || camera.rotation.z > 1.5) this.speedY += this.g;
		if (camera.rotation.z >= -1.6 && camera.rotation.z <= 1.4) this.speedY -= this.g;

		if (camera.rotation.z < 3.1 && camera.rotation.z > 0.1) this.speedX -= this.g;
		if (camera.rotation.z <= 0.1 && camera.rotation.z >= -3.1) this.speedX += this.g
	}
}

//Click event
game.on("click", function(){
	ball.color = "#" + (Math.floor(Math.random()*16000000)).toString(16)
});

//Animation
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ball.draw();
	ball.gravity();
	ball.walls();
};

if (game.css("display", "block")) {
	animate()
};
});
})()
