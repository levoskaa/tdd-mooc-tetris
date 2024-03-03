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

  toString() {
    return this.#cell;
  }
}
