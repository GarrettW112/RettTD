import { Player } from './entities/Player.js';
import { Enemy } from './entities/Enemy.js';
import { Tower } from './entities/Tower.js'
import { InputHandler } from './Input.js';

export class Game {
    constructor(canvas, context) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.time = 0;
        this.projectiles = [];
        this.enemies = [];
        this.towers = [];
        for (let x = 125; x <= 475; x += 50) {
            let temp = [];
            for (let y = 125; y <= 475; y += 50) {
                temp.push(new Tower(x, y, 1, false, false));
            }
            this.towers.push(temp);
        }
        this.player = new Player(this.width, this.height, this.towers, this.enemies, this.projectiles);
        this.input = new InputHandler(canvas);
        this.stime = performance.now();
        this.second = 0;
        this.tstring = "00:00";
    }

    update() {

        const elapsedMS = performance.now() - this.stime;
        const totalSeconds = Math.floor(elapsedMS / 1000);

        if (totalSeconds != this.second) {
            this.second = totalSeconds;
            
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            const minStr = minutes.toString().padStart(2, '0');
            const secStr = seconds.toString().padStart(2, '0');
            
            this.tstring = `${minStr}:${secStr}`;
        }

        this.player.update(this.input);
        let keepIndex = 0;
        for (const enemy of this.enemies) {
            if (enemy.flag == 0) {
                this.enemies[keepIndex] = enemy;
                keepIndex++;
            }
            else {
                this.player.gold++;
            }
        }
        this.enemies.length = keepIndex;
        for (const z of this.enemies) {
            z.update();
        }
        for (const x of this.towers) {
            for (const y of x) {
                y.update();
            }
        }

        keepIndex = 0;
        for (const projectile of this.projectiles) {
            if (projectile.flag == 0) {
                this.projectiles[keepIndex] = projectile;
                keepIndex++;
            }
        }
        this.projectiles.length = keepIndex;
        for (const z of this.projectiles) {
            z.update();
        }
    }

    environment() {
        for (let x = 0; x < 1 + Math.floor(this.time/1000); x++) {
            let rand = Math.floor(Math.random() * 400)
            if (rand == 99) {
                this.enemies.push(new Enemy(Math.floor(Math.random() * this.width), 0, this.player, this.towers));
            }
            if (rand == 199) {
                this.enemies.push(new Enemy(Math.floor(Math.random() * this.width), this.height, this.player, this.towers));
            }
            if (rand == 299) {
                this.enemies.push(new Enemy(0, Math.floor(Math.random() * this.height), this.player, this.towers));
            }
            if (rand == 399) {
                this.enemies.push(new Enemy(this.width, Math.floor(Math.random() * this.height), this.player, this.towers));
            }
        }
        this.time++;
    }

    draw(context) {

        context.font = "20px Arial";
        context.fillStyle = "black";
        context.textAlign = "right";
        context.fillText(this.tstring, this.width - 30, 30);

        this.player.draw(context);
        for (const z of this.enemies) {
            if (z.hp > 0) {
                z.draw(context);
            }
            else {
                z.death;
            }
        }
        for (const x of this.towers) {
            for (const y of x) {
                y.draw(context);
            }
        }
        for (const z of this.projectiles) {
            z.draw(context);
        }
    }
}