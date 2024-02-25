import { Block } from "./Block.mjs";
import { Shapes } from "./Shapes.mjs";

const EMPTY_CELL = ".";

export class Board {
  #width;
  #height;
  #shape;
  #cells;
  #ticks = 0;

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

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
    if (typeof shape === "string") {
      // Create a Block from string shapes to have them provide the same interface as real shapes
      shape = new Block(shape);
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
    return Shapes.toString(this);
  }

  cellAt(row, col) {
    if (!this.hasFalling()) {
      return this.#cells[row][col];
    }
    const middle = Math.floor((this.#width - this.#shape.width) / 2);
    const rowInShape = row >= this.#ticks && row < this.#ticks + this.#shape.height;
    const colInShape = col >= middle && col < middle + this.#shape.width;
    if (!rowInShape || !colInShape) {
      return this.#cells[row][col];
    }
    return this.#shape.cellAt(row - this.#ticks, col - middle);
  }
}
