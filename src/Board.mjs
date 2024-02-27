import { Block } from "./Block.mjs";

const EMPTY_CELL = ".";

export class Board {
  #width;
  #height;
  #shape;
  #cells;
  #shapeY = 0;

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
    if (typeof shape === "string") {
      shape = new Block(shape);
    }
    this.#shape = shape;
    this.#shapeY = 0;
  }

  tick() {
    if (this.#reachedBottom() || this.#collidedWithBlock()) {
      const centerX = Math.floor(this.#width / 2);
      this.#cells[this.#shapeY][centerX] = this.#shape.toString();
      this.#shape = null;
    }
    this.#shapeY++;
  }

  #reachedBottom() {
    return this.#shapeY === this.#height - this.#shape.height;
  }

  #collidedWithBlock() {
    const centerX = Math.floor(this.#width / 2);
    return this.#cells[this.#shapeY + this.#shape.height][centerX] !== EMPTY_CELL;
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
    const centerX = Math.floor(this.#width / 2);
    return this.hasFalling() && row === this.#shapeY && col === centerX ? this.#shape.toString() : this.#cells[row][col];
  }
}
