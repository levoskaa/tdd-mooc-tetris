import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #orientations;
  #index;

  get width() {
    return this.#shape.width;
  }

  get height() {
    return this.#orientations[this.#index].height;
  }

  get #shape() {
    return this.#orientations[this.#index];
  }

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
    return this.#fromShape(shape, 4);
  }

  static get I_SHAPE() {
    const shape = RotatingShape.fromString(
      `.....
       .....
       IIII.
       .....
       .....`
    );
    return this.#fromShape(shape, 2);
  }

  static get O_SHAPE() {
    const shape = RotatingShape.fromString(
      `.OO
       .OO
       ...`
    );
    return this.#fromShape(shape, 1);
  }

  static #fromShape(shape, orientationCount) {
    const orientations = [shape];
    for (let i = 1; i < orientationCount; i++) {
      orientations.push(orientations[i - 1].rotateRight());
    }
    return new Tetromino(orientations, 0);
  }

  rotateRight() {
    return this.#rotate((index) => index + 1, 0);
  }

  rotateLeft() {
    return this.#rotate((index) => index - 1, this.#orientations.length - 1);
  }

  #rotate(indexMapper, fallbackIndex) {
    let newIndex = indexMapper(this.#index);
    if (!this.#isIndexValid(newIndex)) {
      newIndex = fallbackIndex;
    }
    return new Tetromino(this.#orientations, newIndex);
  }

  #isIndexValid(index) {
    return index >= 0 && index < this.#orientations.length;
  }

  cellAt(row, col) {
    return this.#orientations[this.#index].cellAt(row, col);
  }

  toString() {
    return this.#orientations[this.#index].toString();
  }
}
