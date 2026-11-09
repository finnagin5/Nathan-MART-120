var pxv = 0;
var pyv = 0;
var img;
var obj = [];
var win = 0;

function setup() {
    createCanvas(480, 360);

    //mouse object
    addObject(240, 180, 90, 0, 0, 1, 1);
    obj[5] = (255);

    //player object
    addObject(40, 40, 60, 0, 0, 0, .9);

    //level objects
    for (var i = 0; i < 10; i++) {
        addObject(floor(random() * 480), floor(random() * 360), floor(random() * 100) + 20, 0, 0, 0, .5 + (random() * .5));
    }
    for (var i = 0; i < 200; i++) {
        addObject(floor(random() * 480), floor(random() * 360), floor(random() * 10) + 10, 0, 0, 0, .95 + (random() * .05));
    }
}



function draw() {
    background(12, 22, 20);

    //goal render
    goalRender();

    //player movement
    playerMove();

    //physics simulation (verlet integration)
    physicsFrame();

    //win condition
    winCon();
}



function keyPressed() {
    console.log(keyPressed, '', keyCode);
}
function mouseClicked() {
    obj[0] = mouseX;
    obj[1] = mouseY;
}
function preload() {
    img = loadImage('huh.png');
}
function addObject(x, y, rad, rox, roy, lock, damp) {
    obj.push(x);
    obj.push(y);
    obj.push(x);
    obj.push(y);
    obj.push(rad);
    obj.push([floor(random() * 256), floor(random() * 256), floor(random() * 256)]);
    obj.push(rox);
    obj.push(roy);
    obj.push(lock);
    obj.push(damp);
}
function goalRender() {
    fill(0, 255, 0);
    rect(420, 295, 80, 80);
}
function playerMove() {
    pxv = 0
    pyv = 0
    if (keyIsDown(68)) {
        pxv += 1;
    }
    else if (keyIsDown(65)) {
        pxv -= 1;
    }
    if (keyIsDown(87)) {
        pyv -= 1;
    }
    else if (keyIsDown(83)) {
        pyv += 1;
    }
}
function physicsFrame() {
    for (let i = 0; i < obj.length; i += 10) {
        if (obj[i + 8] == 0) {
            var xv = obj[i] - obj[i + 2];
            var yv = obj[i + 1] - obj[i + 3];
            obj[i + 2] = obj[i];
            obj[i + 3] = obj[i + 1];
            obj[i] += xv * obj[i + 9];
            obj[i + 1] += yv * obj[i + 9];
        }
        for (let t = 0; t < obj.length; t += 10) {
            if (i != t) {
                var tx = 0;
                var ty = 0;
                var d = 999;
                var r = 0;
                tx = obj[i] - obj[t];
                ty = obj[i + 1] - obj[t + 1];
                d = sqrt((tx * tx) + (ty * ty));
                r = (obj[i + 4] + obj[t + 4]) / 2;
                if (d < r) {
                    if (obj[i + 8] == 0) {
                        obj[i] += (tx / d) * (r - d) / 2;
                        obj[i + 1] += (ty / d) * (r - d) / 2;
                    }
                    if (obj[t + 8] == 0) {
                        obj[t] -= (tx / d) * (r - d) / 2;
                        obj[t + 1] += (ty / d) * (d - r) / 2;
                    }
                }
            }
        }

        //object x bounds
        if (obj[i] > 480 - obj[i + 4] / 2) {
            obj[i + 2] = obj[i];
            obj[i] = 480 - obj[i + 4] / 2;
        }
        else if (obj[i] < 0 + obj[i + 4] / 2) {
            obj[i + 2] = obj[i];
            obj[i] = 0 + obj[i + 4] / 2;
        }

        //object y bounds
        if (obj[i + 1] > 360 - obj[i + 4] / 2) {
            obj[i + 3] = obj[i + 1];
            obj[i + 1] = 360 - obj[i + 4] / 2;
        }
        else if (obj[i + 1] < 0 + obj[i + 4] / 2) {
            obj[i + 3] = obj[i + 1];
            obj[i + 1] = 0 + obj[i + 4] / 2;
        }

        //rendering
        if (i != 10) {
            fill(obj[i + 5]);
            circle(obj[i], obj[i + 1], obj[i + 4]);
        }
        else {
            image(img, obj[i] - 30, obj[i + 1] - 35, 60, 70);
            obj[i] += pxv;
            obj[i + 1] += pyv;
        }
    }
}
function winCon() {
    if (obj[10] > 420 && obj[11] > 300) {
        win = 1;
    }
    //you win message
    if (win == 1) {
        fill(255, 255, 0);
        textSize(40);
        text("YAAAAYY YOU DID IT!!!!!!!", 0, 180)
    }
}