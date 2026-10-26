var crizpiBizkitz = "purbento";
var x = 0;
var y = 0;
var xv = 0;
var yv = 0;
var titleSize = 20;
var tsv = 1;

function setup() {
    createCanvas(480, 360);
    xv = floor(random() * 4) + 1;
    yv = floor(random() * 4) + 1;
}
function draw() {
    noStroke();
    strokeWeight(2);
    textSize(titleSize * 2);

    background(0, 60, 60);
    fill(64, 41, 14);
    recto(200, 90, 80, 30);
    fill(255, 194, 122);
    circleo(240, 120, 80);
    fill(64, 41, 14);
    ellipseo(240, 90, 70, 30);
    fill(255, 194, 122);
    recto(200, 120, 80, 30);
    triangleo(200, 150, 280, 150, 240, 190);
    stroke(0);
    lineo(240, 135, 245, 150);
    lineo(240, 153, 245, 150)
    fill(220, 220, 220);
    recto(210, 130, 20, 10);
    recto(250, 130, 20, 10);
    lineo(225, 160, 250, 164);
    lineo(212, 130, 268, 130);
    strokeWeight(4);
    stroke(64, 41, 14);
    lineo(210, 125, 230, 127);
    lineo(250, 127, 270, 125);
    stroke(30, 80, 50);
    strokeWeight(8);
    pointo(220, 135);
    pointo(260, 135);

    fill(255, 128, 0)
    strokeWeight(3);
    text('Nathan Mousseau', 70, 270);
    textSize(titleSize);
    text('"screw reddit" - a self portrait', 100, 300);

    x += xv;
    y += yv;
    titleSize += tsv;

    if (x <= -200 || x >= 200) {
        xv *= -1;
    }

    if (y <= -75 || y >= 170) {
        yv *= -1;
    }

    if (titleSize <= 20 || titleSize >= 25) {
        tsv *= -1;
    }
}

// The "o" after each function stands for "offset", as in "with offset". 
function recto(x1, y1, xe, ye) {
    rect(x1 + x, y1 + y, xe, ye);
}

function circleo(x1, y1, r) {
    circle(x1 + x, y1 + y, r);
}

function lineo(x1, y1, x2, y2) {
    line(x1 + x, y1 + y, x2 + x, y2 + y);
}

function pointo(x1, y1) {
    point(x1 + x, y1 + y);
}

function triangleo(x1, y1, x2, y2, x3, y3) {
    triangle(x1 + x, y1 + y, x2 + x, y2 + y, x3 + x, y3 + y);
}

function ellipseo(x1, y1, xe, ye) {
    ellipse(x1 + x, y1 + y, xe, ye);
}