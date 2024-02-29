import { Block } from "./Block.mjs";

const EMPTY_CELL = ".";

export class Board {
  #width;
  #height;
  #shape;
  #cells;
  #shapeX;
  #shapeY;

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
    this.#shapeX = Math.floor((this.#width - this.#shape.width) / 2);
    this.#shapeY = 0;
  }

  tick() {
    if (this.#reachedBottom() || this.#collidedWithBlock()) {
      this.#cells[this.#shapeY][this.#shapeX] = this.#shape.toString();
      this.#shape = null;
    }
    this.#shapeY++;
  }

  #reachedBottom() {
    return this.#shapeY === this.#height - this.#shape.height;
  }

  #collidedWithBlock() {
    return this.#cells[this.#shapeY + this.#shape.height][this.#shapeX] !== EMPTY_CELL;
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
    if (this.hasFalling() && this.#isCellInShape(row, col)) {
      return this.#shape.cellAt(row - this.#shapeY, col - this.#shapeX);
    }
    return this.#cells[row][col];
  }

  #isCellInShape(row, col) {
    return this.#isRowInShape(row) && this.#isColInShape(col);
  }

  #isRowInShape(row) {
    return row >= this.#shapeY && row < this.#shapeY + this.#shape.height;
  }

  #isColInShape(col) {
    return col >= this.#shapeX && col < this.#shapeX + this.#shape.width;
  }
}
