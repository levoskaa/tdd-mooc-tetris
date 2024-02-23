export class Board {
  width;
  height;
  shape;
  ticks;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.ticks = 0;
  }

  drop(shape) {
    this.shape = shape;
  }

  tick() {
    this.ticks++;
  }

  toString() {
    let board = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        board += this.shape && row === this.ticks && col === 1 ? this.shape : ".";
      }
      board += "\n";
    }
    return board;
  }
}
