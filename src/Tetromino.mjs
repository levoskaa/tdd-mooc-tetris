import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #shape;
  #orientations;
  #current;

  constructor(shape, orientations, current) {
    this.#shape = shape;
    this.#orientations = orientations;
    this.#current = current;
  }

  static get T_SHAPE() {
    const shape = RotatingShape.fromString(
      `.T.
       TTT
       ...`
    );
    const orientations = [shape];
    for (let i = 1; i < 4; i++) {
      orientations.push(orientations[i - 1].rotateRight());
    }
    return new Tetromino(shape, orientations, 0);
  }

  static get I_SHAPE() {
    const shape = RotatingShape.fromString(
      `.....
       .....
       IIII.
       .....
       .....`
    );
    const orientations = [shape];
    for (let i = 1; i < 2; i++) {
      orientations.push(orientations[i - 1].rotateRight());
    }
    return new Tetromino(shape, orientations, 0);
  }

  rotateRight() {
    let newIndex = this.#current + 1;
    if (newIndex === this.#orientations.length) {
      newIndex = 0;
    }
    return new Tetromino(this.#orientations[newIndex], this.#orientations, newIndex);
  }

  rotateLeft() {
    let newIndex = this.#current - 1;
    if (newIndex === -1) {
      newIndex = this.#orientations.length - 1;
    }
    return new Tetromino(this.#orientations[newIndex], this.#orientations, newIndex);
  }

  toString() {
    return this.#orientations[this.#current].toString();
  }
}
