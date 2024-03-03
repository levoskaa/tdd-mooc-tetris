export class MovingShape {
  #left;
  #top;

  constructor(left = 0, top = 0) {
    this.#left = left;
    this.#top = top;
  }

  moveTo(row, col) {
    return new MovingShape(row, col);
  }
}
