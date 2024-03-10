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

  constructor(cell, movingShape) {
    this.#cell = cell;
    this.#movingShape = movingShape;
  }

  static createAt(cell, row, col) {
    return new Block(cell, new MovingShape(row, col));
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
    return Block.createAt(this.#cell, row, col);
  }

  moveLeft() {
    return new Block(this.#cell, this.#movingShape.moveLeft());
  }

  moveRight() {
    return new Block(this.#cell, this.#movingShape.moveRight());
  }

  moveDown() {
    this.#movingShape = this.#movingShape.moveDown();
    return this;
  }

  toString() {
    return this.#cell;
  }
}
