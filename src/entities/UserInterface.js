export class UIManager {
    constructor(width, height, gameManager) {
        this.width = width;
        this.height = height;
        this.gm = gameManager;

        this.showBuyMenu = false;
        this.buyMenuGridX = 0;
        this.buyMenuGridY = 0;
        this.flashError = 0;
    }

    update(input) {

        if (!this.gm.isLevelActive && !this.showBuyMenu) {
            if (input.mouse.x > this.width - 205 && input.mouse.y > this.height - 80) {
                if (input.mouse.down) {
                    this.gm.startLevel();
                }
            }
        }

        if (!this.gm.isLevelActive && input.mouse.clicked && !this.showBuyMenu) {
             // Logic to detect grid click goes here
             // this.buyMenuGridX = ...
             // this.showBuyMenu = true;
        }

        // 3. Handle Buy Menu Selection
        if (this.showBuyMenu && input.mouse.clicked) {
            // Check if clicked Wizard Icon
            // if (clickedWizard) {
            //      if (this.gm.buyTower('wizard', this.buyMenuGridX, this.buyMenuGridY)) {
            //          this.showBuyMenu = false; 
            //      } else {
            //          this.flashError = 60; // Trigger red flash
            //      }
            // }
        }
    }

    draw(ctx) {
        // Draw HUD
        ctx.textAlign = "right";
        ctx.fillStyle = (this.flashError > 0 && Math.floor(this.flashError/10)%2!==0) ? "red" : "black";
        ctx.fillText(`Gold: ${this.gm.gold}`, this.width - 30, 60);

        if (this.gm.isLevelActive) {
            ctx.fillText(this.gm.timerString, this.width - 30, 30);
        } else {
            ctx.fillText(`Level ${this.gm.level}`, this.width - 30, 30);
            this.drawStartButton(ctx);
        }

        if (this.showBuyMenu) this.drawBuyMenu(ctx);
        if (this.gm.gameOver) this.drawOverlay(ctx, "YOU DIED...", "red");
        
        if (this.flashError > 0) this.flashError--;
    }

    // Helper draw methods...
    drawStartButton(ctx) { /* ... */ }
    drawBuyMenu(ctx) { /* ... */ }
    drawOverlay(ctx, text, color) { /* ... */ }
}