(function() {
	'use strict';

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.height = 640;
	canvas.width = 480;
	var H = canvas.height;
	var W = canvas.width;

	document.body.appendChild(canvas);

	function loadImageCanvas(dataURL){
		var imageObj = new Image();
		imageObj.onload = function() {
			ctx.drawImage(this, 0, 0);
		};

		imageObj.src = dataURL;
	}

	loadImageCanvas('img/ship.png');
	// var request = new XMLHttpRequest();
	// request.open('GET', 'img/ship.png');
	// request.onreadystatechange = function() {
	// 	if (request.readyStat == 4) {
	// 		if(request.status == 200) {
 //            loadCanvas(request.responseText);
 //          }
	// 	}

	// };
	// request.send(null);

	var gameTime;

	// Game state
	var player = {
	    pos: [0, 0],
	    sprite: new Sprite('img/ship.png', [0, 0], [39, 39], 16, [0, 1])
	};

	var bullets = [];
	var enemies = [];
	var explosions = [];

	var lastFire = Date.now();
	var gameTime = 0;
	var isGameOver;
	var terrainPattern;



	// The main game loop
	var lastTime;
	function main() {
	    var now = Date.now();
	    var dt = (now - lastTime) / 1000.0;
	    update(dt);
	    render();

	    lastTime = now;
	    requestAnimationFrame(main);
	}

	function init() {
	    //terrainPattern = ctx.createPattern(resources.get('img/terrain.png'), 'repeat');

	    // document.getElementById('play-again').addEventListener('click', function() {
	    //     reset();
	    // });

	    reset();
	    lastTime = Date.now();
	    main();
	}

	function update(dt) {
	    gameTime += dt;

	    handleInput(dt);
	    //updateEntities(dt);


	    //checkCollisions();

	    //scoreEl.innerHTML = score;
	}


	function actor(posx, posy) {
		drawRect('#00ff00', posx, posy, 50, 50);
	}

	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	function drawRect(clr, posx, posy, sizeX, sizeY) {
		ctx.beginPath();
		ctx.rect(posx, posy, sizeX, sizeY);
		ctx.fillStyle = clr;
		ctx.fill();
	}

	function handleInput(dt) {
	    if(input.isDown('DOWN') || input.isDown('s')) {
	        player.pos[1] += playerSpeed * dt;
	    }

	    if(input.isDown('UP') || input.isDown('w')) {
	        player.pos[1] -= playerSpeed * dt;
	    }

	    if(input.isDown('LEFT') || input.isDown('a')) {
	        player.pos[0] -= playerSpeed * dt;
	    }

	    if(input.isDown('RIGHT') || input.isDown('d')) {
	        player.pos[0] += playerSpeed * dt;
	    }

	    if(input.isDown('SPACE')){

	    }
	}

	function Player() {
		this.health;
		this.pos = {x: 0, y: 0};
		this.render;
	}



	console.log('test');
	init();


})();