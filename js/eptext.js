function EPText(position, width, height, fontSize, color, context) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.fontSize = fontSize;
    this.color = color;
    this.context = context;
    this.text = 'hello';
    this.update();
}

EPText.prototype.render = function () {
    this.context.font = '' + this.fontSize + 'px Lato';
    this.context.fillStyle = this.color;
    this.context.textAlign = "left";
    this.context.fillText(this.text, this.position.x, this.position.y, 200);
}

EPText.prototype.update = function () {
    this.render();
}