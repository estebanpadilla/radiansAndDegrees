function Line(position, length, angle, color, context) {
    this.position = position;
    this.length = length;
    this.angle = angle;
    this.color = color;
    this.context = context;
    this.lineWidth = 1;
    this.update();
}

Line.prototype.render = function render() {

    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = 'round';
    this.context.moveTo(this.position.x, this.position.y);
    var endPoint = this.position.endPoint(this.angle, this.length);
    this.context.lineTo(endPoint.x, endPoint.y);
    this.context.stroke();
    this.context.closePath();

}

Line.prototype.update = function () {
    this.render();
}