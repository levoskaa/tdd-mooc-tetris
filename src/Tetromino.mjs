import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #orientations;
  #index;

  constructor(orientations, index) {
    this.#orientations = orientations;
    this.#index = index;
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
    return new Tetromino(orientations, 0);
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
    return new Tetromino(orientations, 0);
  }

  rotateRight() {
    let newIndex = this.#index + 1;
    if (newIndex === this.#orientations.length) {
      newIndex = 0;
    }
    return new Tetromino(this.#orientations, newIndex);
  }

  rotateLeft() {
    let newIndex = this.#index - 1;
    if (newIndex === -1) {
      newIndex = this.#orientations.length - 1;
    }
    return new Tetromino(this.#orientations, newIndex);
  }

  toString() {
    return this.#orientations[this.#index].toString();
  }
}
