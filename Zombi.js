var LivingCreature = require("./LivingCreature.js");
module.exports = class Zombi extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 10;
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
      this.energy /= 2;
    }
  }
  mult() {
    var newCell = Random(this.chooseCell(0));
    if (this.energy >= 5 && newCell) {
      var newZombi = new Zombi(newCell[0], newCell[1], this.index);
      zombiArr.push(newZombi);
      matrix[newCell[1]][newCell[0]] = this.index;
      this.energy = 0;
    }
  }

  eat() {
    var grass = Random(this.chooseCell(1));
    if (grass) {
      var newX = grass[0];
      var newY = grass[1];
      matrix[newY][newX] = this.index;
      matrix[this.y][this.x] = 0;
      for (var i in grassArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
      this.energy += 2;
    }
    var grasseater = Random(this.chooseCell(2));
    if (grasseater) {
      var newX = grasseater[0];
      var newY = grasseater[1];
      matrix[newY][newX] = this.index;
      matrix[this.y][this.x] = 0;
      for (var i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
      this.energy += 2;
    }
  }
  die() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;
      for (var i in zombiArr) {
        if (zombiArr[i].x == this.x && zombiArr[i].y == this.y) {
          zombiArr.splice(i, 1);
        }
      }
    }
  }
};
