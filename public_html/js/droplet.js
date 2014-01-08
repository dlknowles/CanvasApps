function randomNumber(min, max) {
    return (Math.random() * (max - min + 1) + min)
}

function Droplet(speed, maxX, maxY) {
    this.x = 10;
    this.y = 290;
    this.dx = 2.86;
    this.dy = -1.3;
    this.gravity = 0.01;
    this.speed = speed;
    this.maxX = maxX;
    this.maxY = maxY;
}

Droplet.prototype.render = function(ctx) {
    ctx.save();
    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.translate(this.x, this.y);
    ctx.fillRect(0, 0, 5, 5);
    ctx.restore();
};

Droplet.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    this.dy += this.gravity;
    
    if (this.offScreen()) {
        this.randomReset();
    }
};

Droplet.prototype.randomReset = function() {
    this.x = 0;
    this.y = this.maxY - 200;
    this.dx = this.speed * randomNumber(0.24, 0.245);
    this.dy = this.speed * randomNumber(-0.45, -0.35);
    this.gravity = 2 * randomNumber(0.005, 0.015);
};

Droplet.prototype.offScreen = function() {
    if (this.y > this.maxY || this.x > this.maxX || this.x < 0 || this.y < 0) return true;
    else return false;
};