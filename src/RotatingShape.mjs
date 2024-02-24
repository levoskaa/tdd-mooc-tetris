import { Position } from "./Position.mjs";

const RotateDirection = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export class RotatingShape {
  #cells;

  constructor(cells) {
    this.#cells = cells;
  }

  static fromString(string) {
    const rows = string.replaceAll(" ", "").split("\n");
    const cells = [];
    for (const row of rows) {
      cells.push(row.split(""));
    }
    return new RotatingShape(cells);
  }

  rotateRight() {
    return this.#rotate(RotateDirection.RIGHT);
  }

  rotateLeft() {
    return this.#rotate(RotateDirection.LEFT);
  }

  #rotate(direction) {
    const rotatedCells = Array.from({ length: 3 }, (_) => []);
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const rotatedCell = this.#rotateCell(row, col, direction);
        rotatedCells[rotatedCell.row][rotatedCell.col] = this.#cells[row][col];
      }
    }
    return new RotatingShape(rotatedCells);
  }

  #rotateCell(row, col, direction) {
    if (direction === RotateDirection.RIGHT) {
      return new Position(col, 2 - row);
    }
    if (direction === RotateDirection.LEFT) {
      return new Position(2 - col, row);
    }
    throw new Error(`Invalid direction for rotation: "${direction}"`);
  }

  toString() {
    const shape = [];
    for (const row of this.#cells) {
      shape.push(...row, "\n");
    }
    return shape.join("");
  }
}
