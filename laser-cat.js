var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
    var laser = new five.Led(9);
    var piezo = new five.Piezo(7);
    var laserState = false;
    var vertical = 0;
    var horizontal = 0;
    var step = 5;

    var horizontalServo = new five.Servo(13);
    horizontalServo.to(horizontal);

    var verticalServo = new five.Servo(11);
    verticalServo.to(vertical);

    var that=this;

    function fire () {
        laserState = !laserState;
        if (laserState) {
            piezo.frequency(440,2000);
            laser.blink();
            that.wait(2000, function () {
                laser.stop();
                laser.off();
            });
        } else {
            laser.off();
        }
    };

    function up () {
        vertical += step;
        verticalServo.to(++vertical);
    };

    function down () {
        vertical -= step;
        verticalServo.to(--vertical);
    };

    function left () {
        horizontal += step;
        horizontalServo.to(++horizontal);
    };

    function right () {
        horizontal -= step;
        horizontalServo.to(--horizontal);
    };

    var actions = {
        'space': fire,
        'up': up,
        'down': down,
        'right': right,
        'left': left
    };

    process.stdin.on('keypress', function(ch, key) {
        actions[key.name]();
    });
});
