import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static get T_SHAPE() {
    return RotatingShape.fromString(
      `.T.
       TTT
       ...`
    );
  }

  static get I_SHAPE() {
    return RotatingShape.fromString(
      `.....
       .....
       IIII.
       .....
       .....`
    );
  }
}
