var LivingCreature = require("./LivingCreature.js");
module.exports = class Noth extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 25;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
    this.directions1 = [
      [this.x - 2, this.y - 2],
      [this.x, this.y - 2],
      [this.x + 2, this.y - 2],
      [this.x - 2, this.y],
      [this.x + 2, this.y],
      [this.x - 2, this.y + 2],
      [this.x, this.y + 2],
      [this.x + 2, this.y + 2],
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }
  move() {
    var fullCells = this.chooseCell(0);
    var newCell = Random(fullCells);
    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[this.y][this.x] = 0;
      matrix[newY][newX] = this.index;
      this.x = newX;
      this.y = newY;
      this.energy -= 8;
    }
  }
  eat() {
    var alien = Random(this.chooseCell(5));
    if (alien) {
      var newX = alien[0];
      var newY = alien[1];
      matrix[newY][newX] = this.index;
      matrix[this.y][this.x] = 0;
      for (var i in alienArr) {
        if (newX == alienArr[i].x && newY == alienArr[i].y) {
          alienArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
      this.energy += 5;
    }
  }
  die() {
    if (this.energy >= -200) {
      matrix[this.y][this.x] = 0;
      for (var i in nothArr) {
        if (nothArr[i].x == this.x && nothArr[i].y == this.y) {
          nothArr.splice(i, 1);
        }
      }
    }
  }
};
