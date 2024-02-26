import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #shape;

  constructor(shape) {
    this.#shape = shape;
  }

  static get T_SHAPE() {
    return new Tetromino(
      RotatingShape.fromString(
        `.T.
         TTT
         ...`
      )
    );
  }

  static get I_SHAPE() {
    return new Tetromino(
      RotatingShape.fromString(
        `.....
         .....
         IIII.
         .....
         .....`
      )
    );
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
