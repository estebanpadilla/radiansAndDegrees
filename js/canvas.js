/**
 * A simple app to show the radian and degrees relationship.
 * @@author Esteban Padilla
 */
window.addEventListener('load', init, false);

function init() {

    var pool = [];
    var canvas = null;
    var context = null;
    var xLine = null;
    var yLine = null;
    var circleBg = null;
    var circle = null;
    var clickPoint = null;
    var center = null;
    var ceroArrow = null;
    var angleArrow = null;
    var radiansText = null;
    var degreesText = null;
    var ceroPIText = null;
    var halfPIText = null;
    var onePIText = null;
    var oneAndHalfPIText = null;
    var sinText = null;
    var cosTxt = null;
    var tan = null;


    var x = 0;
    var y = 0;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var radius = 200;
    var angle_r = Math.PI * 0.5;
    var angle_d = 90;

    //Initialliza properties
    canvas = createCanvas(x, y, width, height);
    canvas.addEventListener('mousemove', clickHandler, false);
    context = canvas.getContext('2d');

    for (var i = 0; i < width; i += 20) {
        var line = new Line(Vector(i, 0), height, 90, '#5e2b83', context);
        pool.push(line);
    }

    for (var i = 0; i < height; i += 20) {
        var line = new Line(Vector(0, i), width, 0, '#5e2b83', context);
        pool.push(line);
    }

    x = 300;
    y = 300;
    xLine = new Line(Vector(x, 0), height, 90, '#ee3344', context);
    pool.push(xLine);
    yLine = new Line(Vector(0, y), width, 0, '#ee3344', context);
    pool.push(yLine);

    circleBg = new Circle(Vector(x, y), radius, '#ee3344', context, false, true);
    pool.push(circleBg);
    circleBg.lineWidth = 4;

    circle = new Circle(Vector(x, y), radius, '#b5e2ef', context, false, true);
    pool.push(circle);
    circle.isClockWise = true;
    circle.startAngle = angle_r;
    circle.lineWidth = 4;

    ceroArrow = new Line(Vector(x, y), radius, 0, '#b5e2ef', context);
    pool.push(ceroArrow);
    ceroArrow.lineWidth = 4;

    center = new Circle(Vector(x, y), 6, '#b5e2ef', context, true, false);
    pool.push(center);

    angle_d = toDegrees(angle_r)
    angleArrow = new Line(Vector(x, y), radius, angle_d, '#b5e2ef', context);
    pool.push(angleArrow);
    angleArrow.lineWidth = 4;

    clickPoint = new Circle(Vector(x, y).endPoint(angle_d, radius), 6, '#b5e2ef', context, true, false);
    pool.push(clickPoint);

    radiansText = new EPText(Vector(25, 50), 200, 0, 30, 'white', context);
    pool.push(radiansText);
    radiansText.text = 'Radians: ' + ('' + angle_r).slice(0, 6);

    degreesText = new EPText(Vector(25, 85), 200, 0, 30, 'white', context);
    pool.push(degreesText);
    degreesText.text = 'Degrees: ' + angle_d;

    ceroPIText = new EPText(Vector((x + radius + 10), (y - 10)), 200, 0, 15, 'white', context);
    pool.push(ceroPIText);
    ceroPIText.text = '0π, 0°';

    halfPIText = new EPText(Vector((x + 10), (y + radius + 25)), 200, 0, 15, 'white', context);
    pool.push(halfPIText);
    halfPIText.text = '0.5π, 90°';

    onePIText = new EPText(Vector((x - (radius + 65)), (y - 10)), 200, 0, 15, 'white', context);
    pool.push(onePIText);
    onePIText.text = '1π, 180°';

    oneAndHalfPIText = new EPText(Vector((x + 10), (y - (radius + 10))), 200, 0, 15, 'white', context);
    pool.push(oneAndHalfPIText);
    oneAndHalfPIText.text = '1.5π, 180°';


    sinText = new EPText(Vector(20, (y + 200)), 200, 0, 15, 'white', context);
    pool.push(sinText);
    sinText.text = 'sin: ' + Number((Math.sin(angle_r)).toFixed(2));

    cosTxt = new EPText(Vector(20, (y + 220)), 200, 0, 15, 'white', context);
    cosTxt.text = 'cos: ' + Number((Math.cos(angle_r)).toFixed(2));
    pool.push(cosTxt);

    // tanTxt = new EPText(Vector(20, 484), 200, 0, 15, 'white', context);
    // tanTxt.text = 'tan: ' + Math.tan(angle_r);
    // pool.push(tanTxt);

    function update() {
        context.clearRect(0, 0, width, height);

        pool.forEach(function (shape) {
            shape.update();
        }, this);

        requestAnimationFrame(update);
    }

    function clickHandler(event) {
        var click = Vector(event.layerX, event.layerY);
        angle_r = click.findAngle(Vector(x, y));

        if (angle_r < 0) {
            angle_r = Math.PI + (Math.PI + angle_r);
        }


        sinText.text = 'sin: ' + Number((Math.sin(angle_r)).toFixed(2));
        cosTxt.text = 'cos: ' + Number((Math.cos(angle_r)).toFixed(2));
        // tanTxt.text = 'tan: ' + Math.tan(angle_r);
        circle.startAngle = angle_r;
        angle_d = Math.ceil(toDegrees(angle_r));
        angleArrow.angle = angle_d;
        clickPoint.position = Vector(x, y).endPoint(angle_d, radius);
        radiansText.text = '' + Number(angle_r).toFixed(2) + ' rad';
        degreesText.text = '' + angle_d + '°';
    }

    update();
}

/**
 * Create the canvas object and adds it to the dom.
 * @param {number} x - The X postion on the browser window.
 * @param {number} x - The Y postion on the browser window.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 */
function createCanvas(x, y, width, height) {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = '#2b0d3b';
    canvas.style.position = 'absolute';
    canvas.style.left = x;
    canvas.style.top = y;
    return canvas;
}
