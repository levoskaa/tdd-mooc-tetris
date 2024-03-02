export class Block {
  #cell;

  get width() {
    return 1;
  }

  get height() {
    return 1;
  }

  constructor(cell) {
    this.#cell = cell;
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
