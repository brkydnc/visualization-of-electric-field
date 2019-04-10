const FREQ_X = 40;
const FREQ_Y = 40;

let CHARGES;
let POINTS;

let chosen;
let offset;
let locked = false;

function setup() {
    createCanvas(500, 500);
    strokeWeight(.5);

    // Add manually 
    CHARGES = [
        new ElectricCharge(400, 250, 10, -100),
        new ElectricCharge(250, 250, 10, 100),
        new ElectricCharge(100, 250, 10, 100),
    ];

    POINTS = [];
    for (let x = width / FREQ_X; x <= width; x += width / FREQ_X) {
        for (let y = height / FREQ_Y; y <= height; y += height / FREQ_Y) {
            POINTS.push(createVector(x, y));
        }
    }

    offset = createVector(0, 0);
}

function draw() {
    background(0);

    stroke(100)
    POINTS.forEach(p => {
        point(p.x, p.y, 5);
    });

    noStroke();
    CHARGES.forEach(c => {
        c.draw();
    });

    stroke(255);
    act();
}

function act() {
    POINTS.forEach(p => {
        let v = createVector(0, 0);
        CHARGES.forEach(c => {
            if (c.location.dist(p) > c.radius) {
                let direction = p5.Vector.sub(p, c.location);
                let d = c.location.dist(p) / 30;
                let mag = c.charge / (d ** 2);
                let E_c = direction.setMag(mag);
                v.add(E_c);
            }
        });
        let E_end = p5.Vector.add(p, v.limit(10));
        line(p.x, p.y, E_end.x, E_end.y);
    })
}

function mousePressed() {
    let mouse = createVector(mouseX, mouseY);
    for (i in CHARGES) {
        let c = CHARGES[i];
        if (mouse.dist(c.location) < c.radius) {
            chosen = CHARGES[i];
            locked = true;
            offset = p5.Vector.sub(c.location, mouse);
            break;
        } else {
            locked = false;
        }
    };
}

function mouseDragged() {
    let mouse = createVector(mouseX, mouseY);
    if (locked && chosen) {
        chosen.location = mouse.add(offset);
    }
}

function mouseReleased() {
    chosen = null;
    offset.set(createVector(0, 0));
    locked = false;
}