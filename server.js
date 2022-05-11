var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", (req, res) => {
  res.redirect("index.html");
});
server.listen(3000);

genMatrix = (n, m) => {
  var matrix = [];
  for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
      var r = Math.floor(Math.random() * 110);
      if (r < 20) r = 0;
      else if (r < 30) r = 1;
      else if (r < 55) r = 2;
      else if (r < 75) r = 3;
      else if (r < 85) r = 4;
      else if (r < 100) r = 5;
      else if (r < 115) r = 6;
      matrix[y][x] = r;
    }
  }
  return matrix;
};

var n = 50;
var m = 60;

grassArr = [];
grassEaterArr = [];
predatorArr = [];
zombiArr = [];
alienArr = [];
nothArr = [];

var Grass = require("./Grass.js");
var GrassEater = require("./grassEater.js");
var Predator = require("./Predator.js");
var Zombi = require("./Zombi.js");
var Alien = require("./Alien.js");
var Noth = require("./Noth.js");

grass_count = 0;
grasseater_count = 0;
predator_count = 0;
zombi_count = 0;
alien_count = 0;
noth_count = 0;

Random = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

matrix = genMatrix(n, m);

for (var y = 0; y < matrix.length; y++) {
  for (var x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] == 1) {
      grassArr.push(new Grass(x, y, 1));
      grass_count++;
    } else if (matrix[y][x] == 2) {
      grassEaterArr.push(new GrassEater(x, y, 2));
      grasseater_count++;
    } else if (matrix[y][x] == 3) {
      predatorArr.push(new Predator(x, y, 3));
      predator_count++;
    } else if (matrix[y][x] == 4) {
      zombiArr.push(new Zombi(x, y, 4));
      zombi_count++;
    } else if (matrix[y][x] == 5) {
      alienArr.push(new Alien(x, y, 5));
      alien_count++;
    } else if (matrix[y][x] == 6) {
      nothArr.push(new Noth(x, y, 6));
      noth_count++;
    }
  }
}
drawserver = () => {
  for (var i in grassArr) {
    grassArr[i].mult();
  }

  for (var i in grassEaterArr) {
    grassEaterArr[i].eat();
    grassEaterArr[i].move();
    grassEaterArr[i].mult();
    grassEaterArr[i].die();
  }
  for (var i in predatorArr) {
    predatorArr[i].eat();
    predatorArr[i].move();
    predatorArr[i].mult();
    predatorArr[i].die();
  }

  for (var i in zombiArr) {
    zombiArr[i].eat();
    zombiArr[i].move();
    zombiArr[i].mult();
    zombiArr[i].die();
  }

  for (var i in alienArr) {
    alienArr[i].eat();
    alienArr[i].move();
    alienArr[i].mult();
    alienArr[i].die();
  }

  for (var i in nothArr) {
    nothArr[i].eat();
    nothArr[i].move();
    nothArr[i].die();
  }
  io.sockets.emit("matrix", [matrix]);
};
setInterval(drawserver, 3000);

var obj = { info: [] };
main = () => {
  obj.info.push({
    "grass's quantity": grass_count,
    "grasseater's quantity": grasseater_count,
    "predator's quantity": predator_count,
    "zombi's quantity": zombi_count,
    "alien's quantity": alien_count,
    "noth's quantity": noth_count,
  });
  fs.writeFileSync("Statistics.json", JSON.stringify(obj));
};
setInterval(main, 15000);
