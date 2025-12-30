export class InputHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = {
            x: 0,
            y: 0,
            clicked: false,
            down: false
        };

        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mousedown', (e) => {

            const rect = this.canvas.getBoundingClientRect();

            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            
            this.mouse.clicked = true;
            this.mouse.down = true;
        });

        window.addEventListener('mouseup', (e) => {
            this.mouse.down = false;
        });

        this.keys = [];
        this.allowedKeys = ['ArrowUp', 'w', 'ArrowDown', 's', 'ArrowLeft', 'a', 'ArrowRight', 'd', 't'];

        window.addEventListener('keydown', (e) => {
            if (this.allowedKeys.includes(e.key) && !this.keys.includes(e.key)) {
                e.preventDefault(); 
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            if (this.allowedKeys.includes(e.key)) {
                const index = this.keys.indexOf(e.key);
                if (index > -1) {
                    this.keys.splice(index, 1);
                }
            }
        });
    }

    reset() {
        this.mouse.clicked = false;
    }
}