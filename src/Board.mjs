const EMPTY_CELL = ".";

export class Board {
  width;
  height;
  shape;
  cells;
  ticks = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = new Array(height).fill(EMPTY_CELL);
    for (let row = 0; row < height; row++) {
      this.cells[row] = new Array(width).fill(EMPTY_CELL);
    }
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("A shape is already falling");
    }
    this.shape = shape;
  }

  tick() {
    if (this.ticks === this.height - 1) {
      this.cells[this.ticks][1] = this.shape;
      this.shape = null;
    }
    this.ticks++;
  }

  hasFalling() {
    return !!this.shape;
  }

  toString() {
    let board = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        board += this.hasFalling() && row === this.ticks && col === 1 ? this.shape : this.cells[row][col];
      }
      board += "\n";
    }
    return board;
  }
}
