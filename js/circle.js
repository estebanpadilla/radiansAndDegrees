function Circle(position, radius, color, context, showFill, showStoke) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.context = context;
    this.showFill = showFill;
    this.showStoke = showStoke;
    this.startAngle = 0;
    this.isClockWise = false;
    this.lineWidth = 1;
    this.update();
}

Circle.prototype.render = function render() {
    this.context.beginPath();

    if (this.showFill) {
        this.context.fillStyle = this.color;
    }

    if (this.showStoke) {
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.lineWidth;
        this.context.lineCap = 'round';
    }

    this.context.arc(this.position.x, this.position.y, this.radius, this.startAngle, Math.PI * 2, this.isClockWise);

    if (this.showFill) {
        this.context.fill();
    }

    if (this.showStoke) {
        this.context.stroke()
    }

    this.context.closePath();
}

Circle.prototype.update = function update() {
    this.render();
}