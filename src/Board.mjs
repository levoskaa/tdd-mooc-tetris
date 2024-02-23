export class Board {
  width;
  height;
  shape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(shape) {
    this.shape = shape;
  }

  toString() {
    return `.${this.shape ?? "."}.\n` +
           "...\n" +
           "...\n"
  }
}
