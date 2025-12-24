export class InputHandler {
    constructor() {
        this.keys = [];
        this.allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 't'];

        window.addEventListener('keydown', (e) => {
            if (this.allowedKeys.includes(e.key) && this.keys.indexOf(e.key) === -1) {
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
}