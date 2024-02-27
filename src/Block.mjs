export class Block {
  #cell;

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
