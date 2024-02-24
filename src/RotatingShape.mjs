export class RotatingShape {
    #cells;
  
    constructor() {
      this.#cells = [
          ["A", "B", "C"],
          ["D", "E", "F"],
          ["G", "H", "I"],
      ];
    }
  
    static fromString() {
      return new RotatingShape();
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
  