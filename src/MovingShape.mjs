export class MovingShape {
  #left;
  #top;

  get left() {
    return this.#left;
  }

  get top() {
    return this.#top;
  }

  constructor(left = 0, top = 0) {
    this.#left = left;
    this.#top = top;
  }

  moveTo(row, col) {
    return new MovingShape(row, col);
  }

  moveLeft() {
    return new MovingShape(this.#left - 1, this.#top);
  }

  moveRight() {
    return new MovingShape(this.#left + 1, this.#top);
  }

  moveDown() {
    return new MovingShape(this.#left, this.#top + 1);
  }
}
