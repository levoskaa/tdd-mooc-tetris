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
    return this.#shape.rotateRight();
  }

  rotateLeft() {
    return this.#shape.rotateLeft();
  }

  toString() {
    return this.#shape.toString();
  }
}
