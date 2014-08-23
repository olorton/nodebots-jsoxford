var keypress = require('keypress');
var five = require('johnny-five');

five.Board().on('ready', function () {
    var chToLed = {
        '1': new five.Led(7),
        '2': new five.Led(8),
        '3': new five.Led(9),
        '4': new five.Led(10),
        '5': new five.Led(11),
        '6': new five.Led(12),
        '7': new five.Led(13)
    }

    var that = this;
    process.stdin.on('keypress', function(ch, key) {
        var led = chToLed[ch];
        if(!led) {return;}

        led.on();
        that.wait(500, function() {led.off();});
    });
});
