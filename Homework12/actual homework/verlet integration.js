//var setup
var pxv = 0;
var pyv = 0;
var img;
var obj = [];
var win = 0;
var c = 0;

//object setup
function setup() {
    createCanvas(480, 480);

    //mouse object
    addObject(240, 180, 90, 0, 0, 1, 1);
    obj[5] = (255);

    //player object
    addObject(100, 100, 60, 0, 0, 0, .9);

    //level objects
    for (var i = 0; i < 40; i++) {
        addObject(floor(random() * 480) + 60, floor(random() * 480) + 60, floor(random() * 100) + 20, 0, 0, 0, .9 + (random() * 0));
    }
    for (var i = 0; i < 100; i++) {
        addObject(floor(random() * 480) + 60, floor(random() * 480) + 60, floor(random() * 10) + 10, 0, 0, 0, .95 + (random() * .05));
    }
}

//main loop
function draw() {
    background(12, 22, 20);

    //goal render
    goalRender();

    //player movement
    playerMove();

    //physics simulation (verlet integration)
    physicsFrame();

    //render
    render();

    //win condition
    winCon();
}

// debug keylogger
function keyPressed() {
    console.log(keyPressed, '', keyCode);
}

//mouse object
function mouseClicked() {
    obj[0] = mouseX + 60;
    obj[1] = mouseY + 60;
}

//load image
function preload() {
    img = loadImage('huh.png');
}

// add circle
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

// render goal
function goalRender() {
    fill(0, 255, 0);
    rect(420, 415, 80, 80);
}

// controls
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

// verlet integration sim
function physicsFrame() {
    for (var i = 0; i < obj.length; i += 10) {
        if (obj[i + 8] == 0) {
            var xv = obj[i] - obj[i + 2];
            var yv = obj[i + 1] - obj[i + 3];
            obj[i + 2] = obj[i];
            obj[i + 3] = obj[i + 1];
            obj[i] += xv * obj[i + 9];
            obj[i + 1] += yv * obj[i + 9];
        }
        for (var t = 0; t < obj.length; t += 10) {

            //horribly unoptimized nonsense
            if (i != t) {
                c = 0;
                collide(mod(obj[i]), mod(obj[i + 1]), obj[i + 4], obj[i + 8], mod(obj[t]), mod(obj[t + 1]), obj[t + 4], obj[t + 8], i, t);
                if (c == 0) {
                    collide(mod(obj[i]), mod(obj[i + 1]), obj[i + 4], obj[i + 8], mod(obj[t]) - 600, mod(obj[t + 1]), obj[t + 4], obj[t + 8], i, t);
                    if (c == 0) {
                        collide(mod(obj[i]), mod(obj[i + 1]), obj[i + 4], obj[i + 8], mod(obj[t]), mod(obj[t + 1]) - 600, obj[t + 4], obj[t + 8], i, t);
                        if (c == 0) {
                            collide(mod(obj[i]), mod(obj[i + 1]), obj[i + 4], obj[i + 8], mod(obj[t]) - 600, mod(obj[t + 1]) - 600, obj[t + 4], obj[t + 8], i, t);
                        }
                    }
                }
            }
        }
    }
}

//draw loop
function render() {
    for (var i = 0; i < obj.length; i += 10) {
        if (i != 10) {
            fill(obj[i + 5]);
            circle(mod(obj[i]) - 60, mod(obj[i + 1]) - 60, obj[i + 4]);
        }
        else {
            image(img, mod(obj[i]) - 90, mod(obj[i + 1]) - 95, 60, 70);
            obj[i] += pxv;
            obj[i + 1] += pyv;
            console.log(mod(obj[i]), pyv);
        }
    }
}

//verlet collision function
function collide(x1, y1, r1, l1, x2, y2, r2, l2, i, t) {
    var tx = 0;
    var ty = 0;
    var d = 999;
    var r = 0;
    var xr1 = 0;
    var yr1 = 0;
    var xr2 = 0;
    var yr2 = 0;
    tx = x1 - x2;
    ty = y1 - y2;
    d = sqrt((tx * tx) + (ty * ty)) + 0.00001;
    r = (r1 + r2) / 2;
    if (d < r) {
        if (l1 == 0) {
            xr1 = (tx / d) * (r - d) / 2;
            yr1 = (ty / d) * (r - d) / 2;
        }
        if (l2 == 0) {
            xr2 = (tx / d) * (r - d) / 2;
            yr2 = (ty / d) * (d - r) / 2;
        }
        c = 1;
    }
    else {
        c = 0;
    }

    obj[i] += xr1;
    obj[i + 1] += yr1;
    obj[t] -= xr2;
    obj[t + 1] += yr2;

    return;
}

//win condition
function winCon() {
    //detect win
    if (mod(obj[10]) > 480 && mod(obj[11]) > 480) {
        win = 1;
    }

    //you win message
    if (win == 1) {
        fill(255, 255, 0);
        textSize(40);
        text("YAAAAYY YOU DID IT!!!!!!!", 0, 180)
    }
}

//coordinate wrapping
function mod(val) {
    val = (((val % 600) + 600) % 600);
    return val;
}