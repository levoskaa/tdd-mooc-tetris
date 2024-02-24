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
        const rotatedCells = [
            [this.#cells[2][0], this.#cells[1][0], this.#cells[0][0]],
            [this.#cells[2][1], this.#cells[1][1], this.#cells[0][1]],
            [this.#cells[2][2], this.#cells[1][2], this.#cells[0][2]],
        ];
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
  