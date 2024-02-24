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
        const rotatedCells = [];
        for (let row = 0; row < 3; row++) {
            rotatedCells[row] = [];
            for (let col = 0; col < 3; col++) {
                rotatedCells[row][col] = this.#cells[2 - col][row];
            }
        }
        return new RotatingShape(rotatedCells);
    }

    rotateLeft() {
        const rotatedCells = [];
        for (let row = 0; row < 3; row++) {
            rotatedCells[row] = [];
            for (let col = 0; col < 3; col++) {
                rotatedCells[row][col] = this.#cells[col][2 - row];
            }
        }
        return new RotatingShape(rotatedCells);
    }
  
    toString() {
      const shape = [];
      for (const row of this.#cells) {
          shape.push(...row, "\n");
      }
      return shape.join("");
    }
  }
  