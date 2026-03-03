// pong.js

class PongGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player1 = new Paddle(10, this.height / 2 - 30);
        this.player2 = new Paddle(this.width - 20, this.height / 2 - 30);
        this.ball = new Ball(this.width / 2, this.height / 2);
        this.isPlayerVsAI = false; // Change this to true for AI opponent
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.player1.draw(this.context);
        this.player2.draw(this.context);
        this.ball.draw(this.context);
    }

    update() {
        this.ball.update();
        this.player2AI(); // AI Logic for player 2 if needed
    }

    player2AI() {
        if (this.isPlayerVsAI) {
            // Simple AI moves to ball's y position
            if (this.ball.y < this.player2.y) {
                this.player2.y -= 4;
            } else if (this.ball.y > this.player2.y + this.player2.height) {
                this.player2.y += 4;
            }
        }
    }

    // Handle input for player 1 and 2
    handleInput() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowUp') this.player1.move(-10);
            if (event.key == 'ArrowDown') this.player1.move(10);
        });
        // Can add controls for player 2 as well
    }

    start() {
        this.handleInput();
        const loop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(loop);
        };
        loop();
    }
}

class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 60;
    }

    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    move(direction) {
        this.y += direction;
        this.y = Math.max(Math.min(this.y, 400), 0); // Stay within bounds
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.speedX = 5;
        this.speedY = 5;
    }

    draw(context) {
        context.fillStyle = 'black';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off top and bottom
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }

        // Reset ball position if it goes out of bounds
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.speedX = -this.speedX;
        }
    }
}

// Usage:
const game = new PongGame('gameCanvas');
game.start();