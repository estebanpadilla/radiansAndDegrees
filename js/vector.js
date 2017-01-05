function Vector(x, y) {

    if (!(this instanceof Vector)) {
        return new Vector(x, y);
    }

    this.x = x || 0;

    this.y = y || 0;

    // this.x = x;
    // this.y = y;
    this.normalLength = 100;
}

Vector.prototype.addX = function (vec) {
    this.x += vec.x;
    return this;
};

Vector.prototype.addY = function (vec) {
    this.y += vec.y;
    return this;
};

Vector.prototype.add = function (vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
};

Vector.prototype.multiply = function (vec) {
    this.x = (this.x * vec.x);
    this.y = (this.y * vec.y);
    return this;
}


Vector.prototype.multiplyX = function (vec) {
    this.x = (this.x * vec.x);
    return this;
}

Vector.prototype.multiplyY = function (vec) {
    this.y = (this.y * vec.y);
    return this;
}

Vector.prototype.sum = function (vec) {
    this.x = (this.x + vec.x);
    this.y = (this.y + vec.y);
    return this;
}



//Returns the vectors end point using the length and angle.
Vector.prototype.endPoint = function endPoint(angle, length) {
    var r = angle * Math.PI / 180;
    var o = (length * Math.sin(r)) + this.y;
    var a = (length * Math.cos(r)) + this.x;
    return new Vector(a, o);
}

//position: sets the position on the shape where the normal will start to project.
Vector.prototype.getNormal = function getNormal(angle, position) {
    var start = this.endPoint(angle, position);
    return new Vector(start.x, start.y).endPoint(angle - 90, this.normalLength);
}

//Finds an angle to another vector.
Vector.prototype.findAngle = function findAngle(v) {
    var a = this.x - v.x;
    var o = this.y - v.y;
    return Math.atan2(o, a);
}

//Finds the distance to another vector.
Vector.prototype.findDistance = function findDistance(v) {
    var a = this.x - v.x;
    var o = this.y - v.y;
    return Math.sqrt((a * a) + (o * o));
}

Vector.prototype.findOposite = function findOposite(v, angle) {

}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
