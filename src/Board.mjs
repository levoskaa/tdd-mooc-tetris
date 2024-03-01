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
    if (!this.hasFalling()) {
      return;
    }
    if (this.#reachedBottom() || this.#collidedWithBlock()) {
      this.#fixInPlace();
    }
    this.#shapeY++;
  }

  #reachedBottom() {
    for (let row = this.#shape.height - 1; row >= 0; row--) {
      for (let col = 0; col < this.#shape.width; col++) {
        if (this.#shape.cellAt(row, col) === EMPTY_CELL) {
          continue;
        }
        if (this.#shapeY + row === this.#height - 1) {
          return true;
        }
      }
    }
    return false;
  }

  #collidedWithBlock() {
    for (let row = this.#shape.height - 1; row >= 0; row--) {
      for (let col = 0; col < this.#shape.width; col++) {
        if (this.#shape.cellAt(row, col) === EMPTY_CELL) {
          continue;
        }
        if (this.#cells[this.#shapeY + row + 1][this.#shapeX + col] !== EMPTY_CELL) {
          return true;
        }
      }
    }
    return false;
  }

  #fixInPlace() {
    for (let row = 0; row < this.#shape.height; row++) {
      for (let col = 0; col < this.#shape.width; col++) {
        if (this.#shapeY + row >= this.#height) {
          break;
        }
        this.#cells[this.#shapeY + row][this.#shapeX + col] = this.#shape.cellAt(row, col);
      }
    }
    this.#shape = null;
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
