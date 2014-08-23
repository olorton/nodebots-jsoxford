var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board();

board.on("ready", function() {

  // Create an Led on pin 13 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  // (new five.Led(13)).strobe();

  var leds = [
    new five.Led(13),
    new five.Led(12),
    new five.Led(11),
    new five.Led(10)
  ];

  var index = 0;
  this.loop(200, function() {
    this.wait(100, function() {
      leds[index % 4].on();
    });

    this.wait(200, function() {
      leds[index % 4].off();
      index++;
    });
  });
});
