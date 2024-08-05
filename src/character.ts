export class Character {
  image: createjs.Bitmap = new createjs.Bitmap('./images/file.png');
  width: number;
  height: number;
  x: number;
  y: number;
  vx: number = 0;
  vy: number = 0;
  gravity: number = 0;
  isCenter: boolean = false;

  currentPlatform: number = 0;
  constructor(x: number, y: number, width: number, height: number) {
    this.image.setBounds(0, 0, width, height);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public jump = async (character: Character, duration: number) => {
    this.gravity = 0.8;
    const jumpDistance = duration;
    const jumpHeight = 12;
    // character.vx = Math.floor(jumpDistance / 120);
    character.vx = jumpDistance / 200;
    // console.log(character.vx);

    if (jumpDistance < 200) {
      character.vy = -jumpHeight;
    } else if (jumpDistance > 200 && jumpDistance < 500) {
      character.vy = -jumpHeight - 6;
    } else if (jumpDistance > 500 && jumpDistance < 800) {
      character.vy = -jumpHeight - 8;
    } else if (jumpDistance > 800 && jumpDistance < 1000) {
      character.vy = -jumpHeight - 10;
    } else if (jumpDistance > 1000 && jumpDistance < 1300) {
      character.vy = -jumpHeight - 13;
    } else if (jumpDistance > 1300 && jumpDistance < 1600) {
      character.vy = -jumpHeight - 16;
    } else if (jumpDistance > 1600 && jumpDistance < 1900) {
      character.vy = -jumpHeight - 19;
    } else {
      character.vy = -jumpHeight - 20;
    }
  };
}
