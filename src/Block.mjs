import { MovingShape } from "./MovingShape.mjs";

export class Block {
  #cell;
  #movingShape;

  get width() {
    return 1;
  }

  get height() {
    return 1;
  }

  get left() {
    return this.#movingShape.left;
  }

  get top() {
    return this.#movingShape.top;
  }

  constructor(cell, row, col) {
    this.#cell = cell;
    this.#movingShape = new MovingShape(row, col);
  }

  cellAt(row, col) {
    if (row === 0 && col === 0) {
      return this.#cell;
    }
  }

  anyFilledCell(predicate) {
    return predicate(0, 0);
  }

  moveTo(row, col) {
    this.#movingShape = this.#movingShape.moveTo(row, col);
    return this;
  }

  moveLeft() {
    this.#movingShape = this.#movingShape.moveLeft();
  }

  moveRight() {
    this.#movingShape = this.#movingShape.moveRight();
  }

  moveDown() {
    this.#movingShape = this.#movingShape.moveDown();
  }

  toString() {
    return this.#cell;
  }
}
