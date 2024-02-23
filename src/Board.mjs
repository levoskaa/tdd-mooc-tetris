const EMPTY_CELL = ".";

export class Board {
  width;
  height;
  shape;
  ticks = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("A shape is already falling");
    }
    this.shape = shape;
  }

  tick() {
    this.ticks++;
  }

  hasFalling() {
    return !!this.shape;
  }

  toString() {
    let board = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        board += this.hasFalling() && row === this.ticks && col === 1 ? this.shape : EMPTY_CELL;
      }
      board += "\n";
    }
    return board;
  }
}
