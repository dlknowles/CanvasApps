function Shard(x, y) {
    this.x = x;
    this.x0 = x;
    this.y = y;
    this.y0 = y;
    this.dx = 0;
    this.dy = 0;
    this.radius = 0;
    this.dRadius = 0;
    this.visible = true;
    this.gravity = 0;
    
    this.reset();
}

Shard.prototype.reset = function() {
    this.dx = randomNumber(-2.0, 1.0);
    this.dy = randomNumber(-2.0, 1.0);
    this.radius = randomNumber(4.0, 9.0);
    this.dRadius = randomNumber(-0.5, -1.0);
    this.x = this.x0;
    this.y = this.y0;
    this.gravity = randomNumber(0.1, 0.2);
    
    this.visible = true;
};

Shard.prototype.render = function(ctx) {
    if (this.visible) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
};

Shard.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    this.radius += this.dRadius;
    
    this.dy += this.gravity;

    if (this.radius < 1) {
        this.visible = false;
    }
};

function Shards(numShards, x, y, minX, maxX, minY, maxY) {
    this.maxShards = numShards;
    this.numVisible = numShards;
    this.shards = new Array();
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;

    for (var i = 0; i < maxShards; ++i) {
        this.shards.push(new Shard(x, y));
    }
    
    this.reset(x, y);
}

Shards.prototype.reset = function(x, y) {   
    this.numVisible = this.maxShards;
    
    for (var i = 0; i < this.maxShards; ++i) {
        this.shards[i].reset();
        this.shards[i].x = x;
        this.shards[i].y = y;
    }
};

Shards.prototype.render = function(ctx) {
    for (var i = 0; i < this.maxShards; ++i) {
        this.shards[i].render(ctx);
    }
};

Shards.prototype.update = function() {
    this.numVisible = 0;
    for (var i = 0; i < this.maxShards; ++i) {
        this.shards[i].update();
        
        /*
        if (this.shards[i].x < this.minX || this.shards[i].x > this.maxX ||
            this.shards[i].y < this.minY || this.shards[i].y > this.maxY) {
            
            this.shards[i].visible = false;
        }
        */
        
        if (this.shards[i].visible == true) ++this.numVisible;
    }                    
};
