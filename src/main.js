import { Player } from './entities/Player.js';
import { Enemy } from './entities/Enemy.js';
import { Tower } from './entities/Tower.js';
import { InputHandler } from './Input.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// canvas size
canvas.width = 800;
canvas.height = 500;

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this.width, this.height);
        this.enemy = new Enemy(this.width, this.height);
        this.tower = new Tower(this.width, this.height);
        this.projectiles = [];
        this.input = new InputHandler();
    }
    update() {
        this.player.update(this.input);
        this.enemy.update(this.player.x, this.player.y);
        this.tower.update(this.enemy, this.projectiles);
        for (const z of this.projectiles) {
            z.update();
        }
    }
    draw(context) {
        this.player.draw(context);
        this.enemy.draw(context);
        this.tower.draw(context);
        for (const z of this.projectiles) {
            z.draw(context);
        }
    }
}

const game = new Game(canvas.width, canvas.height);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
}

animate();