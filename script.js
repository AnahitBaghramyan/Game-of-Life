var socket = io();
var side = 20;

setup = () => {
  createCanvas(side * 35, side * 35);
  frameRate(15);
  background("#acacac");
};
drawMatrix = (arr) => {
  var matrix = arr[0];
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("orange");
      } else if (matrix[y][x] == 5) {
        fill("blue");
      } else if (matrix[y][x] == 6) {
        fill("black");
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
      }

      rect(x * side, y * side, side, side);
    }
  }
};

socket.on("matrix", drawMatrix);
