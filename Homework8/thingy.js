function setup() {
    createCanvas(480, 360);
}
function draw() {
    noStroke();
    strokeWeight(2);
    textSize(40);

    background(0, 60, 60);
    fill(64, 41, 14);
    rect(200, 90, 80, 30);
    fill(255, 194, 122);
    circle(240, 120, 80);
    fill(64, 41, 14);
    ellipse(240, 90, 70, 30);
    fill(255, 194, 122);
    rect(200, 120, 80, 30);
    triangle(200, 150, 280, 150, 240, 190);
    stroke(0);
    line(240, 135, 245, 150);
    line(240, 153, 245, 150)
    fill(220, 220, 220);
    rect(210, 130, 20, 10);
    rect(250, 130, 20, 10);
    line(225, 160, 250, 164);
    line(212, 130, 268, 130);
    strokeWeight(4);
    stroke(64, 41, 14);
    line(210, 125, 230, 127);
    line(250, 127, 270, 125);
    stroke(30, 80, 50);
    strokeWeight(8);
    point(220, 135);
    point(260, 135);

    fill(255, 128, 0)
    strokeWeight(3);
    text('Nathan Mousseau', 70, 270);
    textSize(20);
    text('"screw reddit" - a self portrait', 100, 300);
}