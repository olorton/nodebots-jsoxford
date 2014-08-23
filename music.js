var five = require('johnny-five');
var songs = require('j5-songs');

five.Board().on('ready', function () {
  var piezo = new five.Piezo();

  var songToLed = {
    "D4": new five.Led(7),
    "D5": new five.Led(8),
    "A4": new five.Led(9),
    "G4": new five.Led(10),
    "G5": new five.Led(11),
    "F#5": new five.Led(12),
    "E4": new five.Led(13)
  };

  var chToLed = {
      '1': "D4",
      '2': "D5",
      '3': "A4",
      '4': "G4",
      '5': "G5",
      '6': "F#5",
      '7': "E4"
  };

  var song = [
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["E4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4", 1],
      ["E4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["G4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["G4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4", 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["E4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["E4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["G4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["G4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4", 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4" , 1],
      ["D4", 1],
      ["D5", 1],
      ["A4", 1],
      ["G4", 1],
      ["G5", 1],
      ["A4", 1],
      ["F#5", 1],
      ["A4", 1]
    ];

  // Load a song object
  piezo.play({
    song: song, tempo: 120
  });

  //-------

  var score = 0;
  var that = this;
  var pressedNote;

  process.stdin.on('keypress', function(ch, key) {
    pressedNote = chToLed[ch];
    if(!pressedNote) {return;}

    var led = songToLed[pressedNote];

    if(!led) {return;}

    led.on();

    that.wait(200, function() {
      led.off();
    });
  });

  //-------

  var index = 0;
  var currentNote;
  this.loop(500, function() {
    if (index >= song.length) {
      console.log("\nYOUR SCORE IS: ", score);

      process.exit();
    }

    var note = song[index++];
    var led = songToLed[note[0]];
    if (!led) {
      console.log(note[0]);
      return;
    }

    currentNote = note[0];
    led.on();

    this.wait(5, function() {led.off();});
    this.wait(250, function() {
      if (pressedNote === currentNote) {
        score++;
      }

      console.log("SCORE: ", score);
    })
  });

  // Play it !
  // piezo.play(song);

  // List all songs
  songs.list(function (err, tunes) {
    // Object literal with all the songs
  });
});
