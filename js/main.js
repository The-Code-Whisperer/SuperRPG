var canvas = document.getElementById('super-js-adventure');
var ctx = canvas.getContext('2d');
var width = 256;
var height = 224;
var link = new Image();
var key = [0, 0, 0, 0, 0];
var player = {
    x: 5,
    y: 20
};
player.speed = 4;
player.fps = 16;
player.animationUpdateTime = 1000 / player.fps;
var lastTime = 0;
var timeSinceLastFrameSwap = 0;

function init() {
    // Initialise the game!
    link.src = 'images/link.png';
    zoom(2)
    player.sequence = [3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 1, 2];
    player.sequenceIdx = 0;
    lastTime = window.performance.now(); // store an initial time

}

function zoom(s) {
    canvas.style.cssText = 'width:' + width * s + 'px;height:' + height * s + 'px;';
    canvas.parentNode.style.cssText = 'width:' + width * s + 'px;height:' + height * s + 'px;';
}

function main() {
    // Here's where we handle all the input, logic and drawing to the screen per frame.
    var now = window.performance.now(); // the time in ms on each loop
    var elapsed = (now - lastTime); // how many ms since the last time the loop ran
    timeSinceLastFrameSwap += elapsed;

    // has enough time passed since the last frame was displayed?
    if (timeSinceLastFrameSwap > player.animationUpdateTime) {
        // enough time has passed. display the next frame.
        if (player.sequenceIdx < player.sequence.length - 1)
            player.sequenceIdx++;
        else
            player.sequenceIdx = 0;
        // reset the counter
        timeSinceLastFrameSwap = 0;
    }

    ctx.clearRect(0, 0, 256, 224);
    var spritePos = player.sequence[player.sequenceIdx] * 46;

    ctx.drawImage(link, spritePos, 0, 36, 51, player.x, player.y, 18, 28);

    if (key[2])
        player.y -= player.speed;
    if (key[3])
        player.y += player.speed;
    if (key[0])
        player.x -= player.speed;
    if (key[1])
        player.x += player.speed;



    lastTime = now;

    // call itself by requesting the next animation frame, and so begin the endless loop
    requestAnimationFrame(main);
}

function changeKey(which, to) {
    switch (which) {
        // left
        case 65:
        case 37:
            key[0] = to;
            break;

        // up
        case 87:
        case 38:
            key[2] = to;
            break;

        // right
        case 68:
        case 39:
            key[1] = to;
            break;

        // down
        case 83:
        case 40:
            key[3] = to;
            break;

        // space bar;
        case 32:
            key[4] = to;
            break;
    }
}

document.addEventListener('keydown', function (e) { changeKey(e.keyCode, 1) });
document.addEventListener('keyup', function (e) { changeKey(e.keyCode, 0) });

// Initialise
init();

var input = {

}
// Start the loop!
requestAnimationFrame(main);
