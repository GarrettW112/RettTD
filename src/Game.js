import { Player } from './entities/Player.js';
import { Enemy } from './entities/Enemy.js';
import { Tower } from './entities/Tower.js';
import { InputHandler } from './Input.js';

export class Game {
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
        this.projectiles = this.projectiles.filter(z => z.flag == 0);
        for (const z of this.projectiles) {
            z.update();
        }

    }
    draw(context) {
        this.player.draw(context);
        if (this.enemy.hp > 0) {
            this.enemy.draw(context);
        }
        else {
            this.enemy.death;
        }
        this.tower.draw(context);
        for (const z of this.projectiles) {
            z.draw(context);
        }
    }
}