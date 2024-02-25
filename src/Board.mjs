const EMPTY_CELL = ".";

export class Board {
  #width;
  #height;
  #shape;
  #cells;
  #ticks = 0;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#cells = new Array(height).fill(EMPTY_CELL);
    for (let row = 0; row < height; row++) {
      this.#cells[row] = new Array(width).fill(EMPTY_CELL);
    }
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("A shape is already falling");
    }
    this.#shape = shape;
    this.#ticks = 0;
  }

  tick() {
    if (this.#reachedBottom() || this.#collidedWithBlock()) {
      this.#cells[this.#ticks][1] = this.#shape;
      this.#shape = null;
    }
    this.#ticks++;
  }

  #reachedBottom() {
    return this.#ticks === this.#height - 1;
  }

  #collidedWithBlock() {
    return this.#cells[this.#ticks + 1][1] !== EMPTY_CELL;
  }

  hasFalling() {
    return !!this.#shape;
  }

  toString() {
    const board = [];
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        board.push(this.#shapeAt(row, col));
      }
      board.push("\n");
    }
    return board.join("");
  }

  #shapeAt(row, col) {
    if (!this.hasFalling()) {
      return this.#cells[row][col];
    }
    const shapeRows = this.#shape.toString().trim().split("\n");
    const shapeWidth = shapeRows[0].length;
    const shapeHeight = shapeRows.length;
    const middle = Math.floor((this.#width - shapeWidth) / 2)
    const rowInShape = row >= this.#ticks && row < (this.#ticks + shapeHeight);
    const colInShape = col >= middle && col < (middle + shapeWidth);
    if (!rowInShape || !colInShape) {
      return this.#cells[row][col];
    }
    return typeof this.#shape === "string" ? this.#shape[0] : this.#shape.cellAt(row - this.#ticks, col - middle);
  }
}
