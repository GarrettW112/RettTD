import { Game } from './Game.js';

window.addEventListener('load', function() {
    // Setup Canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    ctx.imageSmoothingEnabled = false;

    // Instantiate Game
    const game = new Game(canvas, ctx);

    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    // Animation Loop
    function animate(timeStamp) {

        const deltaTime = timeStamp - lastTime;
        
        if (deltaTime >= interval) {
            
            lastTime = timeStamp - (deltaTime % interval);

            ctx.fillStyle = 'green'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            game.update();
            game.environment();
            game.draw(ctx);
        }
        
        requestAnimationFrame(animate);
    }
    animate(0);
});