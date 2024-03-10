import { Block } from "./Block.mjs";
import { Shapes } from "./Shapes.mjs";

export const EMPTY_CELL = ".";

export class Board {
  #width;
  #height;
  #shape;
  #cells;

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

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
      shape = Block.createAt(shape, 0, 0);
    }
    this.#shape = shape.moveTo(Math.floor((this.#width - shape.width) / 2), 0);
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    if (this.#reachedBottom() || this.#collidedWithBlock()) {
      this.#fixInPlace();
      this.#shape = null;
      return;
    }
    this.#shape = this.#shape.moveDown();
  }

  #reachedBottom() {
    return this.#shape.anyFilledCell((row, _) => this.#shape.top + row === this.#height - 1);
  }

  #collidedWithBlock() {
    return this.#shape.anyFilledCell(
      (row, col) => this.#cells[this.#shape.top + row + 1][this.#shape.left + col] !== EMPTY_CELL
    );
  }

  #fixInPlace() {
    for (let row = 0; row < this.#shape.height; row++) {
      if (this.#shape.top + row === this.#height) {
        break;
      }
      for (let col = 0; col < this.#shape.width; col++) {
        const cell = this.#shape.cellAt(row, col);
        if (cell !== EMPTY_CELL) {
          this.#cells[this.#shape.top + row][this.#shape.left + col] = cell;
        }
      }
    }
  }

  hasFalling() {
    return !!this.#shape;
  }

  toString() {
    return Shapes.toString(this);
  }

  cellAt(row, col) {
    if (this.hasFalling() && this.#isCellInShape(row, col)) {
      return this.#shape.cellAt(row - this.#shape.top, col - this.#shape.left);
    }
    return this.#cells[row][col];
  }

  #isCellInShape(row, col) {
    return this.#isRowInShape(row) && this.#isColInShape(col);
  }

  #isRowInShape(row) {
    return row >= this.#shape.top && row < this.#shape.top + this.#shape.height;
  }

  #isColInShape(col) {
    return col >= this.#shape.left && col < this.#shape.left + this.#shape.width;
  }

  moveLeft() {
    this.#shape = this.#shape.moveLeft();
  }

  moveRight() {
    this.#shape = this.#shape.moveRight();
  }

  moveDown() {
    this.#shape = this.#shape.moveDown();
  }
}
