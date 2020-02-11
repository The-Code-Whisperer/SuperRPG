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

function init() {
    // Initialise the game!
    link.src = 'images/link.png';
    zoom(1.6)
    player.sequence = [3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 1, 2];
    player.sequenceIdx = 0;

}

function zoom(s) {
    canvas.style.cssText = 'width:' + width * s + 'px;height:' + height * s + 'px;';
    canvas.parentNode.style.cssText = 'width:' + width * s + 'px;height:' + height * s + 'px;';
}

function main() {
    // Here's where we handle all the input, logic and drawing to the screen per frame.

    ctx.clearRect(0, 0, 256, 224);
    //var spritePos = player.sequence[player.sequenceIdx] * 16;
    ctx.drawImage(link, 0, 0, 32, 50, player.x, player.y, 16, 25);
    if (player.sequenceIdx < player.sequence.length - 1)
        player.sequenceIdx++;
    else
        player.sequenceIdx = 0;

    if (key[2])
        player.y -= 4;
    if (key[3])
        player.y += 4;
    if (key[0])
        player.x -= 4;
    if (key[1])
        player.x += 4;

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
