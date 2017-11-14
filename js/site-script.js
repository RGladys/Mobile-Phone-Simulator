var camera = (function (){

var canvas = document.getElementById("canvas"),
screenDOM = document.getElementById("screen"),
startDOM = document.getElementById("start"),
wrapper = document.getElementById("wrapper");;
if (window.innerHeight > 800) {
	canvas.width = 900;
	canvas.height = 700;
} else {
	canvas.width = window.innerWidth/1.5;
	canvas.height = window.innerHeight;
	wrapper.width = 0
}
var scene, camera, renderer, renderer2, raycaster, mouse, intersects, button, power, light, light2, light3, loader, controls, screen, meshscreen;
var objects = [];
var offsetTop = canvas.offsetTop;
var offsetLeft = canvas.offsetLeft;

//RENDERER, CAMERA, SCENE
renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
renderer.setSize(canvas.width, canvas.height);
renderer.domElement.style.zIndex = 1;
renderer.setClearColor("lightblue");
renderer.domElement.style.pointerEvents = "none";
renderer.domElement.style.position = 'absolute';

renderer2 = new THREE.CSS3DRenderer();
renderer2.setSize(canvas.width, canvas.height);
renderer2.domElement.style.position = 'absolute';
document.getElementById('wrapper').appendChild(renderer2.domElement);

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(40, canvas.width/canvas.height, 0.1, 1000);
camera.position.z = -8.5;

//COTROLS
controls = new THREE.TrackballControls(camera);
controls.addEventListener("change", render);
controls.staticMoving = true;
controls.rotateSpeed = 10;
controls.noZoom = true;
controls.minDistance = 6;
controls.maxDistance = 12;
controls.noPan = true;

//RAYCASTER
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
function onMouseMove(event){
	mouse.x = ((event.clientX - offsetLeft) / canvas.width) * 2 - 1;
	mouse.y = - ((event.clientY - offsetTop) / canvas.height) * 2 + 1;
	intersects = raycaster.intersectObjects(objects);
};
function onMouseDown(){
	intersects[0].object.stopControls();
};
function onMouseUp(){
	button.position.z = -1;
	power.position.y = 0;
	controls.noRotate = false;
};
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);

//RENDER FUNCTION
function render(){
	renderer.render(scene, camera);
	renderer2.render(scene, camera);
	raycaster.setFromCamera(mouse, camera);
};

//LIGHT
light = new THREE.AmbientLight("white", .6);
scene.add(light);

light2 = new THREE.PointLight("white", .7, 50);
light2.position.set(-20, 0, -20);
scene.add(light2);

light3 = new THREE.PointLight("white", .5, 30);
light3.position.z = 20;
scene.add(light3)

//OBJECTS
loader = new THREE.JSONLoader();

loader.load(
	'models/button.json',
	function (geometry, materials){
		var material = new THREE.MultiMaterial( materials);
		button = new THREE.Mesh(geometry, material);
		scene.add(button);
		button.position.set(0, 0, -1);
		objects.push(button);
		button.stopControls = function(){
			this.position.z += .03;
			controls.noRotate = true;
			if (stateMap.startStatus) {
				startDOM.style.display = "block";
				$j("#bar").css("display", "block")
			};
			if (!stateMap.startStatus && document.getElementById("menu").style.display == "none") {
				methods.button();
			}
			stateMap.on = true;
		};
	}
);

loader.load(
	'models/phone.json',
	function (geometry, materials){
		var material = new THREE.MultiMaterial(materials);
		var phone = new THREE.Mesh(geometry, material);
		scene.add(phone);
		phone.position.set(0, 0, -1);
		objects.push(phone)
		phone.stopControls = function(){
			controls.noRotate = true;
		};
	}
);

loader.load(
	'models/power.json',
	function (geometry, materials){
		power = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: "#888380"}));
		scene.add(power);
		power.position.set(0, 0, -1);
		objects.push(power)
		power.stopControls = function(){
			controls.noRotate = true;
			this.position.y = -0.01;
			$j("#screen").children().css("display", "none");
			methods.power()
		};
	}
);

loader.load(
	'models/buttonBack2.json',
	function (geometry, materials){
		var material = new THREE.MultiMaterial(materials);
		var buttonBack = new THREE.Mesh(geometry, material);
		scene.add(buttonBack);
		buttonBack.position.set(0, 0, -1);
		objects.push(buttonBack)
		buttonBack.stopControls = function(){
			controls.noRotate = true;
			methods.back()
		};
	}
);

//SCREEN
screen = new THREE.CSS3DObject(screenDOM);
screen.rotation.y = Math.PI;
screen.scale.set(.0085, .0085, 1);
screen.position.set(-.035, .07, -.25);
scene.add(screen);

meshScreen = new THREE.Mesh(new THREE.PlaneGeometry(2.47, 4.2), new THREE.MeshBasicMaterial({color: "black", opacity: 0}));
meshScreen.position.set(0, .07, -.25);
meshScreen.rotation.copy(screen.rotation);
scene.add(meshScreen);

//ANIMATION
function animate(){
	requestAnimationFrame(animate);
	render();
	controls.update();
};
animate();

return camera
})()
