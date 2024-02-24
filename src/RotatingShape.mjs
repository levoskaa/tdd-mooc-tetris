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
  
    toString() {
      const shape = [];
      for (const row of this.#cells) {
          shape.push(...row, "\n");
      }
      return shape.join("");
    }
  }
  