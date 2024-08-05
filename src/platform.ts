export class Platform {
  shape: createjs.Bitmap = new createjs.Bitmap('./images/file_2.png');
  x: number;
  y: number;
  platformId: number = 0;
  constructor(x: number, y: number, width: number, height: number) {
    this.shape.setBounds(0, 0, width, height);
    this.x = x;
    this.y = y;
  }
}
