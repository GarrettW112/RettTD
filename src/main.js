import { Game } from './Game.js';

window.addEventListener('load', function() {
    // Setup Canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;

    // Instantiate Game
    const game = new Game(canvas.width, canvas.height);

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        game.update();
        game.environment();
        game.draw(ctx);
        
        requestAnimationFrame(animate);
    }
    animate();
});