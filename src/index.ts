const can: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D = can.getContext("2d");
document.body.appendChild(can);

let speed: number = 30;
let particles: Array<Particle> = [];
let mouse = {x: 0, y: 0};

const colors = [
  "#00bdff",
  "#4d39ce",
  "#088eff"
]

class Particle {
  bx: number = null;
  by: number = null;
  x: number = null;
  y: number = null;
  oRadius: number = null;
  color: any = null;
  velocity: number = null;
  radius: number = null;
  radians: number = Math.random() * Math.PI * 2;
  lastMouse: object = null;
  c: number = null;

  constructor(
    x: number,
    y: number,
    oRadius: number = 10,
    color: any = 0,
    velocity: number = 0.05,
    radius: number = 150
  ) {
    this.bx = x;
    this.by = y;
    this.oRadius = oRadius;
    if (typeof color == "string")
      this.color = color;
    else this.color = color;
    this.velocity = velocity;
    this.radius = radius;
    this.lastMouse = {x: this.x, y: this.y}
  }

  update = (): void => {
    const lastPoint = [this.x, this.y]

    this.lastMouse["x"] += (mouse["x"] - this.lastMouse["x"]) * 0.05;
    this.lastMouse["y"] += (mouse["y"] - this.lastMouse["y"]) * 0.05;

    //circle effect
    this.radians += this.velocity;
    this.x = this.lastMouse["x"] + Math.cos(this.radians) * this.radius;
    this.y = this.lastMouse["y"] + Math.sin(this.radians) * this.radius;
    this.draw(lastPoint);
  };

  draw = (lastPoint: any): void => {
    ctx.beginPath();
    if (typeof this.color === "string")
      ctx.strokeStyle = this.color;
    else {
      ctx.strokeStyle = `hsl(${this.color}, 100%, 60%)`;
      this.color += 1;
    }
    ctx.lineWidth = this.oRadius;
    ctx.moveTo(lastPoint[0], lastPoint[1])
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  };
}

const animate = (): void => {
  requestAnimationFrame(animate);
  //ctx.clearRect(0,0,can.width,can.height);
  ctx.fillStyle = "rgba(0,0,0, 0.05)"
  ctx.fillRect(0,0,can.width,can.height);
  particles.forEach((particle) => {
    particle.update();
  });
};

for (let i = 0; i < 150; i++) {
  //particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, (10 + Math.random() * 5), colors[Math.floor(Math.random()*colors.length)], (0.01 + Math.random() * 0.10), (125 + Math.random() * 300)));
  //particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, (10 + Math.random() * 5), Math.floor(Math.random()*360), (0.01 + Math.random() * 0.10), (125 + Math.random() * 300)));
  particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, (10 + Math.random() * 5), Math.floor(Math.random()*20), (0.01 + Math.random() * 0.10), (125 + Math.random() * 300)));
}

const redrawCan = (): void => {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
};
redrawCan();
animate();
window.addEventListener("resize", redrawCan);
document.addEventListener("mousemove", (evt) => {
  mouse = {x: evt.x, y: evt.y}
})
