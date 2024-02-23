export class Board {
  width;
  height;
  shape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(shape) {
    this.shape = shape;
  }

  toString() {
    let board = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        board += this.shape && row === 0 && col === 1 ? this.shape : ".";
      }
      board += "\n";
    }
    return board;
  }
}
