(function() {
	'use strict';

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.height = 640;
	canvas.width = 480;
	var H = canvas.height;
	var W = canvas.width;

	document.body.appendChild(canvas);


	resources.load([
	    'img/ship.png'
	]);
	resources.onReady(init);

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

	function update(dt) {
	    gameTime += dt;

	    handleInput(dt);
	    //updateEntities(dt);


	    //checkCollisions();

	    //scoreEl.innerHTML = score;
	}

	function render() {
	    ctx.fillStyle = terrainPattern;
	    ctx.fillRect(0, 0, canvas.width, canvas.height);

	    // Render the player if the game isn't over
	    if(!isGameOver) {
	        renderEntity(player);
	    }

	    renderEntities(bullets);
	    renderEntities(enemies);
	    renderEntities(explosions);
	}


	function renderEntity(entity) {
	    ctx.save();
	    ctx.translate(entity.pos[0], entity.pos[1]);
	    entity.sprite.render(ctx);
	    ctx.restore();
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

	function Sprite(url, pos, size, speed, frames, dir, once) {
	    this.pos = pos;
	    this.size = size;
	    this.speed = typeof speed === 'number' ? speed : 0;
	    this.frames = frames;
	    this._index = 0;
	    this.url = url;
	    this.dir = dir || 'horizontal';
	    this.once = once;
	};


	Sprite.prototype.render = function(ctx) {
	    var frame;

	    if(this.speed > 0) {
	        var max = this.frames.length;
	        var idx = Math.floor(this._index);
	        frame = this.frames[idx % max];

	        if(this.once && idx >= max) {
	            this.done = true;
	            return;
	        }
	    }
	    else {
	        frame = 0;
	    }


	    var x = this.pos[0];
	    var y = this.pos[1];

	    if(this.dir == 'vertical') {
	        y += frame * this.size[1];
	    }
	    else {
	        x += frame * this.size[0];
	    }

	    ctx.drawImage(resources.get(this.url),
	                  x, y,
	                  this.size[0], this.size[1],
	                  0, 0,
	                  this.size[0], this.size[1]);
	}


	console.log('test');
	main();


})();