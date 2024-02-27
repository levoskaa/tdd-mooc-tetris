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
    this.#cells = [];
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
    return this.hasFalling() && row === this.#ticks && col === 1 ? this.#shape : this.#cells[row][col];
  }
}
