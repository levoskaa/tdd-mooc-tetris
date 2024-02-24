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
      for (let row = 0; row < this.#cells.length; row++) {
          for (let col = 0; col < this.#cells[0].length; col++) {
              shape.push(this.#cells[row][col]);
          }
          shape.push("\n");
      }
      return shape.join("");
    }
  }
  