var orbs = [];
var datLen = 7;

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < 8000; i += datLen) {
        orbs[i] = floor(random() * 800);
        orbs[i + 1] = floor(random() * 600);
        orbs[i + 2] = [floor(random() * 10) + 180, floor(random() * 20) + 190, floor(random() * 30) + 200];
        orbs[i + 3] = floor(random() * 8) - 1;
        orbs[i + 4] = floor(random() * 5) + 1;
        orbs[i + 5] = floor(random() * 5) + 2;
        orbs[i + 6] = (random() *.25) + .6;
    }
}

function draw() {
    background(27, 27, 50);
    for (var i = 0; i < orbs.length; i += datLen) {
        orbs[i] += orbs[i + 3];
        orbs[i + 1] += orbs[i + 4];

        orbs[i] = modCoord(orbs[i], 800 + (orbs[i + 5] * 2));
        orbs[i + 1] = modCoord(orbs[i + 1], 600 + (orbs[i + 5] * 2));

        fill(orbs[i + 2]);
        circle(orbs[i] - orbs[i + 5], orbs[i + 1] - orbs[i + 5], orbs[i + 5]);

        var d = sqrt(((orbs[i] - mouseX) * (orbs[i] - mouseX)) + ((orbs[i + 1] - mouseY) * (orbs[i + 1] - mouseY)))
        orbs[i + 3] += (orbs[i] - mouseX) / (d * d / 100);
        orbs[i + 4] += (orbs[i + 1] - mouseY) / (d * d / 100);
        orbs[i + 3] *= orbs[i+6];
        orbs[i + 3] += .8;
        orbs[i + 4] *= orbs[i+6];
        orbs[i + 4] += .8;
        console.log(d)
    }
}

function modCoord(val, mod) {
    val = (((val % mod) + mod) % mod);
    return val;
}