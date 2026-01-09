import { Wisp } from './Enemy.js';
import { Skeleton } from './Enemy.js';

export class Environment {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.level = 1;
        this.envtime = 1;
    }

    update(enemies) {

        // Introduces Wisps & Basic Mechanics

        if (this.level == 2) {
            if (this.envtime % 60 == 0 && this.envtime < 1202) {
                let rand = Math.floor(Math.random() * 4)
                if (rand == 0) {
                    enemies.push(new Wisp(Math.floor(Math.random() * this.width), 0));
                }
                if (rand == 1) {
                    enemies.push(new Wisp(Math.floor(Math.random() * this.width), this.height));
                }
                if (rand == 2) {
                    enemies.push(new Wisp(0, Math.floor(Math.random() * this.height)));
                }
                if (rand == 3) {
                    enemies.push(new Wisp(this.width, Math.floor(Math.random() * this.height)));
                }
            }
            this.envtime++;
        }

        // Introduces Skeletons & Upgrades

        if (this.level == 1) {
            if (this.envtime % 60 == 0 && this.envtime < 1202) {
                let rand = Math.floor(Math.random() * 4)
                if (rand == 0) {
                    enemies.push(new Skeleton(Math.floor(Math.random() * this.width), 0));
                }
                if (rand == 1) {
                    enemies.push(new Skeleton(Math.floor(Math.random() * this.width), this.height));
                }
                if (rand == 2) {
                    enemies.push(new Skeleton(0, Math.floor(Math.random() * this.height)));
                }
                if (rand == 3) {
                    enemies.push(new Skeleton(this.width, Math.floor(Math.random() * this.height)));
                }
            }
            this.envtime++;
        }

        // Introduces Poltergheists & Core Defense

        if (this.level == 3) {

        }

        // Introduces Golems

        if (this.level == 4) {
            
        }
        
        // Introduces Zombies

        if (this.level == 5) {

        }

        // Introduces Novice Necromancers

        if (this.level == 6) {

        }

        // All Enemy Types

        if (this.level == 7) {

        }

        // Boss Fight (Zombie Captain)

        if(this.level == 8) {
            
        }
    }
}