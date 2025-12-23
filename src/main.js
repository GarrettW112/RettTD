import { Game } from './Game.js';

window.addEventListener('load', function() {
    // Setup Canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;

    // Instantiate Game
    const game = new Game(canvas.width, canvas.height);

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        game.update();
        game.draw(ctx);
        
        requestAnimationFrame(animate);
    }
    animate();
});