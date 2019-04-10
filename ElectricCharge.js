class ElectricCharge {
    constructor(x, y, r, q) {
        this.location = createVector(x, y);
        this.radius = r;
        this.charge = q;

        this.color = [random(255), random(255), random(255)];
    }

    draw() {
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.radius * 2, this.radius * 2);
    }
}