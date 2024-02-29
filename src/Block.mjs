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

  toString() {
    return this.#cell;
  }
}
