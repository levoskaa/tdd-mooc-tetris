export class Position {
  #row;
  #col;

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }

  constructor(row, col) {
    this.#row = row;
    this.#col = col;
  }
}
