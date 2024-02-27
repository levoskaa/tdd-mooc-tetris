export class Block {
  #cell;

  constructor(cell) {
    this.#cell = cell;
  }

  toString() {
    return this.#cell;
  }
}
