import { WizardTower, Wall } from './Tower.js';

export class GameManager {
    constructor(towers, magic, environment, enemies, player) {

        this.towers = towers;
        this.magic = magic;
        this.environment = environment;
        this.enemies = enemies;
        this.player = player;

        this.gold = 50;
        this.level = 1;
        this.levelStart = false;
        this.gameOver = false;
        this.paused = false;

        this.startTime = 0;
        this.secondsPassed = 0;
        this.timerString = "00:00";
    }

    startLevel() {

        this.environment.envtime = 1;
        this.isLevelActive = true;
        this.startTime = performance.now();
        this.player.bmode = false;
    }

    update() {

        if (!this.isPaused && this.isLevelActive) {
            this.updateTimer();
            this.checkWinLoss();
        }
    }

    updateTimer() {

        const elapsedMS = performance.now() - this.startTime;
        const totalSeconds = Math.floor(elapsedMS / 1000);

        if (totalSeconds !== this.elapsedSeconds) {
            this.elapsedSeconds = totalSeconds;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            this.timerString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    checkWinLoss() {

        if (this.player.hp <= 0) {
            this.gameOver = true;
        }
        if (this.elapsedSeconds > 30 && this.enemies.length === 0) {
            this.isLevelActive = false;
            this.player.bmode = true;
            this.level++;
        }
    }

    buyTower(type, gridX, gridY) {

        if (gridX < 0 || gridX > 7 || gridY < 0 || gridY > 7) {
            return false;
        }
        
        const cost = (type === 'wizard') ? 20 : 10;

        if (this.gold >= cost) {
            if (type === 'wizard') {
                this.towers[gridX][gridY] = new WizardTower(
                    this.towers[gridX][gridY].x, 
                    this.towers[gridX][gridY].y
                );
                this.magic.push(this.towers[gridX][gridY]);
            } 
            else if (type === 'wall') {
                this.towers[gridX][gridY] = new Wall(
                    this.towers[gridX][gridY].x, 
                    this.towers[gridX][gridY].y
                );
            }
            this.gold -= cost;
            return true;
        }
        return false;
    }
}

