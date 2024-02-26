import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #shape;
  #orientations;

  constructor(shape, orientations) {
    this.#shape = shape;
    this.#orientations = orientations;
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
    return new Tetromino(shape, orientations);
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
    return new Tetromino(shape, orientations);
  }

  rotateRight() {
    return this.#shape.rotateRight();
  }

  rotateLeft() {
    return this.#shape.rotateLeft();
  }

  toString() {
    return this.#shape.toString();
  }
}
