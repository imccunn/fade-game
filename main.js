(function() {
	'use strict';

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.height = 640;
	canvas.width = 480;
	var H = canvas.height;
	var W = canvas.width;

	document.body.appendChild(canvas);


	var gameTime;

	// Game state
	var player = {
	    pos: [0, 0],
	    sprite: new Sprite('img/sprites.png', [0, 0], [39, 39], 16, [0, 1])
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

		drawRect('#000', 0, 0, H, W);
		actor(rand(0, H-50), rand(0, W-50));
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

    if(input.isDown('SPACE') &&
       !isGameOver &&
       Date.now() - lastFire > 100) {
        var x = player.pos[0] + player.sprite.size[0] / 2;
        var y = player.pos[1] + player.sprite.size[1] / 2;

        bullets.push({ pos: [x, y],
                       dir: 'forward',
                       sprite: new Sprite('img/sprites.png', [0, 39], [18, 8]) });
        bullets.push({ pos: [x, y],
                       dir: 'up',
                       sprite: new Sprite('img/sprites.png', [0, 50], [9, 5]) });
        bullets.push({ pos: [x, y],
                       dir: 'down',
                       sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });


        lastFire = Date.now();
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