var can = document.createElement("canvas");
var ctx = can.getContext("2d");
document.body.appendChild(can);
var speed = 30;
var particles = [];
var mouse = { x: 0, y: 0 };
var colors = [
    "#00bdff",
    "#4d39ce",
    "#088eff"
];
var Particle = /** @class */ (function () {
    function Particle(x, y, oRadius, color, velocity, radius) {
        var _this = this;
        if (oRadius === void 0) { oRadius = 10; }
        if (color === void 0) { color = 0; }
        if (velocity === void 0) { velocity = 0.05; }
        if (radius === void 0) { radius = 150; }
        this.bx = null;
        this.by = null;
        this.x = null;
        this.y = null;
        this.oRadius = null;
        this.color = null;
        this.velocity = null;
        this.radius = null;
        this.radians = Math.random() * Math.PI * 2;
        this.lastMouse = null;
        this.c = null;
        this.update = function () {
            var lastPoint = [_this.x, _this.y];
            _this.lastMouse["x"] += (mouse["x"] - _this.lastMouse["x"]) * 0.05;
            _this.lastMouse["y"] += (mouse["y"] - _this.lastMouse["y"]) * 0.05;
            //circle effect
            _this.radians += _this.velocity;
            _this.x = _this.lastMouse["x"] + Math.cos(_this.radians) * _this.radius;
            _this.y = _this.lastMouse["y"] + Math.sin(_this.radians) * _this.radius;
            _this.draw(lastPoint);
        };
        this.draw = function (lastPoint) {
            ctx.beginPath();
            if (typeof _this.color === "string")
                ctx.strokeStyle = _this.color;
            else {
                ctx.strokeStyle = "hsl(" + _this.color + ", 100%, 60%)";
                _this.color += 1;
            }
            ctx.lineWidth = _this.oRadius;
            ctx.moveTo(lastPoint[0], lastPoint[1]);
            ctx.lineTo(_this.x, _this.y);
            ctx.stroke();
            ctx.closePath();
        };
        this.bx = x;
        this.by = y;
        this.oRadius = oRadius;
        if (typeof color == "string")
            this.color = color;
        else
            this.color = color;
        this.velocity = velocity;
        this.radius = radius;
        this.lastMouse = { x: this.x, y: this.y };
    }
    return Particle;
}());
var animate = function () {
    requestAnimationFrame(animate);
    //ctx.clearRect(0,0,can.width,can.height);
    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, can.width, can.height);
    particles.forEach(function (particle) {
        particle.update();
    });
};
for (var i = 0; i < 150; i++) {
    //particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, (10 + Math.random() * 5), colors[Math.floor(Math.random()*colors.length)], (0.01 + Math.random() * 0.10), (125 + Math.random() * 300)));
    //particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, (10 + Math.random() * 5), Math.floor(Math.random()*360), (0.01 + Math.random() * 0.10), (125 + Math.random() * 300)));
    particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, (10 + Math.random() * 5), Math.floor(Math.random() * 20), (0.01 + Math.random() * 0.10), (125 + Math.random() * 300)));
}
var redrawCan = function () {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
};
redrawCan();
animate();
window.addEventListener("resize", redrawCan);
document.addEventListener("mousemove", function (evt) {
    mouse = { x: evt.x, y: evt.y };
});
