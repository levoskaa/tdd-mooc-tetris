import { EMPTY_CELL } from "./Board.mjs";
import { MovingShape } from "./MovingShape.mjs";
import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #orientations;
  #index;
  #movingShape;

  get width() {
    return this.#shape.width;
  }

  get height() {
    return this.#shape.height;
  }

  get left() {
    return this.#movingShape.left;
  }

  get top() {
    return this.#movingShape.top;
  }

  get #shape() {
    return this.#orientations[this.#index];
  }

  constructor(orientations, index, movingShape) {
    this.#orientations = orientations;
    this.#index = index;
    this.#movingShape = movingShape;
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
    return new Tetromino(orientations, 0, new MovingShape());
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
    return this.#shape.cellAt(row, col);
  }

  anyFilledCell(predicate) {
    for (let row = this.height - 1; row >= 0; row--) {
      for (let col = 0; col < this.width; col++) {
        if (this.cellAt(row, col) !== EMPTY_CELL && predicate(row, col)) {
          return true;
        }
      }
    }
    return false;
  }

  moveTo(row, col) {
    this.#movingShape = this.#movingShape.moveTo(row, col);
    return this;
  }

  moveLeft() {
    this.#movingShape = this.#movingShape.moveLeft();
  }

  moveRight() {
    this.#movingShape = this.#movingShape.moveRight();
  }

  moveDown() {
    this.#movingShape = this.#movingShape.moveDown();
  }

  toString() {
    return this.#shape.toString();
  }
}
