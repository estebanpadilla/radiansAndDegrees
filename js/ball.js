function Ball(position, radius, color, context) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.context = context;
    this.target = undefined;
    this.stopX = false;
    this.stopY = false;
    this.sx = 0; //speed on y
    this.sy = 0; //speed on y
    this.weight = 4.1;
    this.gravity = 9.8 / 100;
    this.ay = (this.gravity * this.weight);//acceleration on y
    this.ax = 0.01;//(this.gravity * this.weight);//acceleration on y
    this.collitionPoint = undefined;
    this.update();
}

Ball.prototype.render = function render() {

    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    this.context.fill();
    this.context.closePath();

    if (this.collitionPoint != undefined) {
        this.context.beginPath();
        this.context.strokeStyle = 'white';
        this.context.lineWidth = 1;
        this.context.moveTo(this.collitionPoint.x, this.collitionPoint.y);
        this.context.lineTo(this.position.x, this.position.y);
        this.context.stroke();
        this.context.closePath();
    }

}

Ball.prototype.update = function update() {


    // if (!this.stopY) {
    // this.sy += this.ay;
    // this.position.y += this.sy;
    // }

    // if (!this.stopX) {
    // this.sx += this.ax;
    // this.position.x -= this.sx;
    // }

    this.render();
}


Ball.prototype.updateCollision = function updateCollision(target, angle, length) {

    if (this.stopY) {
        return;
    }

    var lineEnd = target.endPoint(angle, length);
    if ((this.position.x + this.radius) >= target.x &&
        (this.position.x - this.radius) <= lineEnd.x) {

        var angleFromBalltoLine = this.position.findAngle(target);
        var angleFromBalltoLine_Degrees = toDegrees(angleFromBalltoLine)
        var distanceFromBalltoLine = this.position.findDistance(target);

        var wholeAngle_degrees = 0;
        if (angleFromBalltoLine < 0) {
            wholeAngle_degrees = angle + Math.abs(angleFromBalltoLine_Degrees);
        } else {
            wholeAngle_degrees = angle - Math.abs(angleFromBalltoLine_Degrees);
        }
        var wholeAngle_radians = toRadians(wholeAngle_degrees);
        var o = distanceFromBalltoLine * Math.sin(wholeAngle_radians);

        this.position.normalLength = o
        this.position.angle = 0 // dependin on position set the angle ratio

        this.collitionPoint = this.position.getNormal((180 + angle), 0);
        // var endLineBall = this.position.getNormal((180 + angle), 0);

        console.log(this.sy);
        console.log(this.ay);


        if (o < (this.radius)) {
            this.sy = 0;
            this.position.y = (o + (this.position.y - this.radius));
            //this.sy -= this.ay;
        }
    }
}

Ball.prototype.reset = function reset() {
    this.sy = 0;
    this.sx = 0;
    this.stop = false;
}
