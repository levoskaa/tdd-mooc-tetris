export class Shapes {
  static toString(shape) {
    const stringBuilder = [];
    for (let row = 0; row < shape.height; row++) {
      for (let col = 0; col < shape.width; col++) {
        stringBuilder.push(shape.cellAt(row, col));
      }
      stringBuilder.push("\n");
    }
    return stringBuilder.join("");
  }
}
