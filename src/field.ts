import { platform } from 'os';
import { Character } from './character';
import { Platform } from './platform';
import { Timer } from './timer';

export class Field {
  public canvasWidth: number = 640;
  public canvasHeight: number = 480;

  canvas = <HTMLCanvasElement>document.getElementById('canvas');
  stage: createjs.Stage = new createjs.Stage(this.canvas);
  fieldContainer: createjs.Container = new createjs.Container();
  playerContainer: createjs.Container = new createjs.Container();

  // character: Character = new Character(this.canvasWidth / 2 - 270, this.canvasHeight - 190, 60, 65);
  character: Character = new Character(this.canvasWidth / 2 - 270, this.canvasHeight - 150, 60, 0);

  platforms: Platform[] = [];
  basePlatform = new Platform(this.canvasWidth / 2 - 270, this.canvasHeight - 180, 80, 60);
  bg1 = new createjs.Bitmap('./images/bg.jpg');
  bg2 = new createjs.Bitmap('./images/bg.jpg');
  split = new createjs.Bitmap('./images/split.png');

  isGameOver: boolean = false;
  isScrolling: boolean = true;
  timeId: number = 0;
  gameScore: number = 15;
  ips: number = 60;
  id: number = 0;
  pressTime: number = 0;
  isPressing: boolean = false;
  isClick: boolean = true; // ////いらないかも　確認する
  isLand: boolean = true; ////

  countTime: number = 0; /////追加した
  countTimeId: number = 0; /////追加した
  limitTime: number = 3;

  sleep = async (second: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, second);
    });
  };

  constructor() {
    this.init();

    // const random = Math.floor(Math.random() * (400 - 250)) + 200;
    // console.log(random);
  }

  public init = () => {
    this.display();
    this.clickEvent();

    this.playerContainer.removeEventListener('mousedown', this.mouseDown);
    this.playerContainer.removeEventListener('pressup', this.mouseUp);

    this.id = window.setInterval(this.handleTick, 1000 / this.ips);
  };

  private handleTick = () => {
    this.gameUpdate();
    this.stage.update();
  };

  public mouseDown = (event: Object): void => {
    const mouseEvent = event as createjs.MouseEvent;
    if (mouseEvent.nativeEvent.button === 0 && this.isLand) {
      this.isPressing = true;
      this.pressTime = new Date().getTime();
      this.pressFlogMove();

      // this.disableClick();
    }
  };

  private mouseUp = (event: Object) => {
    const mouseEvent = event as createjs.MouseEvent;
    if (mouseEvent.nativeEvent.button === 0 && this.isPressing) {
      // this.isLand = false; //追加
      this.isPressing = false;
      const releaseTime = new Date().getTime();
      clearInterval(this.timeId);
      // this.disableClickCanvas(); // 変更　こっちを設定する
      this.timeId = 0;

      this.countTime = 0; ////////追加
      clearInterval(this.countTimeId); ////////追加
      this.countTimeId = 0; ////////追加

      let jumpDuration = Math.floor(releaseTime - this.pressTime);
      if (jumpDuration > 2000) {
        jumpDuration = 2000;
        this.character.jump(this.character, jumpDuration);
      } else {
        this.character.jump(this.character, jumpDuration);
      }
      // createjs.Tween.get(this.character.image).wait(500);
      // .call(() => {this.isPressSpace = false})
      // // .wait(3000)
      // .call(() => {this.disableClickCanvas()});
      // console.log('mouseup!!!!');
    }
  };

  private resetEvent = () => {
    // this.canvas.removeEventListener('pressup', this.mouseDown);
    // this.canvas.removeEventListener('mouseup', this.mouseUp);
  };

  private disableClick = () => {
    // this.canvas.style.pointerEvents = 'none';
    this.fieldContainer.mouseEnabled = false;
  };

  private enableClick = () => {
    this.fieldContainer.mouseEnabled = true;
  };

  public keyDownEvent = (event: KeyboardEvent) => {
    if (event.key === ' ' && this.isLand) {
      this.isPressing = true;
      this.pressTime = new Date().getTime();
      this.pressFlogMove();

      this.disableClick();
    }
  };

  public keyUpEvent = (event: KeyboardEvent) => {
    if (event.key === ' ' && this.isLand) {
      this.isLand = false; //追加
      this.isPressing = false;
      const releaseTime = new Date().getTime();
      clearInterval(this.timeId);
      // this.disableClickCanvas(); // 変更　こっちを設定する
      this.timeId = 0;

      this.countTime = 0; ////////追加
      clearInterval(this.countTimeId); ////////追加
      this.countTimeId = 0; ////////追加

      let jumpDuration = Math.floor(releaseTime - this.pressTime);
      if (jumpDuration > 2000) {
        jumpDuration = 2000;
        this.character.jump(this.character, jumpDuration);
      } else {
        this.character.jump(this.character, jumpDuration);
      }
      // createjs.Tween.get(this.character.image).wait(500);
      // .call(() => {this.isPressSpace = false})
      // // .wait(3000)
      // .call(() => {this.disableClickCanvas()});
      // console.log('mouseup!!!!');
    }
  };

  private clickEvent = () => {
    this.fieldContainer.on('mousedown', this.mouseDown);
    this.fieldContainer.on('pressup', this.mouseUp);

    // this.character.image.off('mousedown', this.mouseDown);
    // this.character.image.off('pressup', this.mouseUp);

    // this.character.image.on('mousedown', () => {
    //   console.log('???????');
    // });
    // this.character.image.on('pressup', () => {
    //   console.log('!!!!!!!');
    // });

    window.addEventListener('keydown', this.keyDownEvent);
    window.addEventListener('keyup', this.keyUpEvent);
    //////
    // this.canvas.addEventListener('mousedown', this.mouseDown);
    // this.canvas.addEventListener('mouseup', this.mouseUp);
  };

  private createPlatform = () => {
    const numberOfPlatforms = 5;
    const platformWidth = 40; //60  //あたり判定の幅を調節
    const platformHeight = 60; //60　//あたり判定の高さを調節
    const horizontalSpace = 200; //足場と足場の距離

    for (let i = 0; i < numberOfPlatforms; i++) {
      let x = i * horizontalSpace + this.canvasWidth;
      let y = Math.random() * (-300 + -10) + -10 + (this.canvasHeight - platformHeight);

      const platform = new Platform(x, y, platformWidth, platformHeight);
      this.fieldContainer.addChild(platform.shape);
      platform.shape.x = platform.x - 400;
      platform.shape.y = platform.y;
      platform.platformId = i + 1;
      this.platforms.push(platform);
    }
  };

  /* ゲーム全体のアップデート */
  private gameUpdate = () => {
    /*重力を加える*/
    this.character.vy += this.character.gravity;
    // this.character.image.x += this.character.vx;
    this.character.image.y += this.character.vy;

    /* bg移動*/
    this.updateBackground();
    /* 足場のupdate */
    this.updatePlatforms();

    /////　追加
    for (const platform of this.platforms) {
      this.checkOnLand(this.character.image, platform.shape); /////
    }

    // /*下に落ちないようにする*/
    // if (this.character.image.y > 490 - this.character.height) {
    //   this.character.image.y = 490 - this.character.height;
    //   this.character.vy = 0;
    //   this.character.vx = 0;

    //   /* 下に落ちた時の水しぶき */
    //   this.split.visible = true;
    //   createjs.Tween.get(this.split).to({ y: this.character.image.y - 100 }, 150);
    //   // clearInterval(this.id);
    //   // this.isGameOver = true;
    // }
    // }

    /*下に落ちないようにする*/
    if (this.character.image.y > 490 - this.character.height) {
      this.character.image.y = 490 - this.character.height;
      this.character.vy = 0;
      this.character.vx = 0;

      /* 下に落ちた時の水しぶき */
      this.split.visible = true;
      createjs.Tween.get(this.split).to({ y: this.character.image.y - 100 }, 150);
      // clearInterval(this.id);
      // this.isGameOver = true;

      // this.isScrolling = false;
      // this.reset();
    }
  };

  public checkOnLand = (flogFigure: createjs.Bitmap, platformFigure: createjs.Bitmap) => {
    const flog = flogFigure.getBounds();
    const platform = platformFigure.getBounds();

    if (!flog || !platform) return;

    const flogCenterX = flogFigure.x + flog.width / 2;
    const flogCenterY = flogFigure.y + flog.height / 2;
    const platformCenterX = platformFigure.x + platform.width / 2;
    const platformCenterY = platformFigure.y + platform.height / 2;

    const dx = flogCenterX - platformCenterX;
    const dy = flogCenterY - platformCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (flog.width + platform.width) / 2;

    if (distance < minDistance) {
      console.log('Collision detected!');
      this.isLand = true;

      if (this.gameScore > 10) {
        ////////追加した！！！！
        this.countTimer();
        console.log(this.countTime);
        ////////追加した！！！！
        this.checkTimeStayPlatform(platformFigure);
      }
    }
  };

  ////////追加した！！！！
  private countTimer = () => {
    if (this.countTimeId === 0) {
      this.countTimeId = window.setInterval(() => {
        this.countTime++;
      }, 1000);
    }
  };

  ////////追加した！！！！
  private checkTimeStayPlatform = (platform: createjs.Bitmap) => {
    if (this.countTime > this.limitTime * 0.5) {
      createjs.Tween.get(platform)
        .to({ y: platform.y + 5 }, 100)
        .to({ y: platform.y - 5 }, 100)
        .to({ y: platform.y + 5 }, 100)
        .to({ y: platform.y - 5 }, 100);
    }

    if (this.countTime > this.limitTime && this.isLand) {
      createjs.Tween.get(platform).to({ y: 600 }, 500);
      createjs.Tween.get(this.character.image)
        .call(() => this.disableClick())
        .to({ y: 600 }, 500)
        .call(() => clearInterval(this.countTimeId));
    }
  };

  /* 足場のアップデート */
  private updatePlatforms = () => {
    for (const platform of this.platforms) {
      const platformBound = platform.shape.getBounds();
      const characterBound = this.character.image.getBounds();

      platform.shape.x -= this.character.vx;
      this.basePlatform.shape.x -= this.character.vx;

      if (
        //Platform(x, y, 60, 60);
        this.character.image.x + characterBound.width > platform.shape.x &&
        this.character.image.x < platform.shape.x + platformBound.width &&
        this.character.image.y + characterBound.height > platform.shape.y &&
        this.character.image.y + characterBound.height - this.character.vy < platform.shape.y
      ) {
        this.character.image.y = platform.shape.y - characterBound.height;
        this.character.gravity = 0;
        this.character.vy = 0;
        this.character.vx = 0;
        // this.isClick = true; ////////いらないかも　確認する
        this.enableClick();

        this.character.currentPlatform = platform.platformId;

        //スコアの判定
        // if (platform.platformId === platform.platformId + 1) {
        //   this.gameScore++;
        // } else if (platform.platformId === platform.platformId + 2) {
        //   this.gameScore += 1 + 2;
        // } else if (platform.platformId === platform.platformId + 3) {
        //   this.gameScore += 1 + 3;
        // }
      }

      // const random = Math.floor(Math.random() * (400 - 200)) + 200;

      /* 足場の位置を再調整 */
      if (platform.shape.x + platform.shape.getBounds().width < 0) {
        platform.shape.x = this.canvasWidth + 250; // 640
        // platform.shape.x = Math.random() * (200 - 50) + 50 + this.canvasWidth + 250;
        // platform.shape.y = Math.random() * (this.canvasHeight - 60); //480 - 60 420
        platform.shape.y = Math.random() * (350 - 50) + 50; //480 - 60 420
      }

      // let x = i * horizontalSpace + this.canvasWidth;

      // let count: number = Math.random() * (2.5 - 1.2) + 1.2;
      // if (platform.shape.x + platform.shape.getBounds().width < 0) {
      //   platform.shape.x = this.canvasWidth + 460;
      //   platform.shape.y = Math.random() * (this.canvasHeight - 60);
      // }
    }
  };

  /* 背景のアップデート */
  private updateBackground = () => {
    this.bg1.x -= this.character.vx;
    this.bg2.x -= this.character.vx;
    if (this.bg1.x <= -this.canvasWidth) {
      this.bg1.x = this.canvasWidth;
    }
    if (this.bg2.x <= -this.canvasWidth) {
      this.bg2.x = this.canvasWidth;
    }
  };

  private pressFlogMove = () => {
    let time = 0;
    this.timeId = window.setInterval(() => {
      time++;
      if (time > 2 && time < 5) {
        this.character.image.y = this.character.image.y + 1;
      } else if (time > 5 && time < 10) {
        this.character.image.y = this.character.image.y + 2;
      } else if (time > 10 && time < 15) {
        this.character.image.y = this.character.image.y + 3;
      }
    }, 100);
  };

  public reset = () => {
    // this.isScrolling = true;

    this.resetEvent();
    // this.stage.removeAllEventListeners;
    // console.log('!!!!!!!!!');
    clearInterval(this.id);
    this.isGameOver = false;
    this.platforms = [];
    this.isGameOver = false;
    this.timeId = 0;
    this.gameScore = 0;
    this.id = 0;
    this.pressTime = 0;
    this.isPressing = false;
    this.isClick = true; ////いらないかも　確認する
    this.isLand = true;

    clearInterval(this.countTimeId); ////追加

    this.init();
  };

  public display = () => {
    this.stage.addChild(this.fieldContainer);
    this.stage.addChild(this.playerContainer);

    /* bgを追加 */
    this.fieldContainer.addChild(this.bg1);
    this.fieldContainer.addChild(this.bg2);
    this.bg1.setBounds(0, 0, this.canvasWidth, this.canvasHeight);
    this.bg2.setBounds(0, 0, this.canvasWidth, this.canvasHeight);
    this.bg1.x = 0;
    this.bg2.x = this.canvasWidth;

    /* 初期の足場を追加　*/
    // const basePlatform = new Platform(this.canvasWidth / 2 - 350, this.canvasHeight - 180, 80, 60);
    this.fieldContainer.addChild(this.basePlatform.shape);
    this.basePlatform.shape.x = this.basePlatform.x;
    this.basePlatform.shape.y = this.basePlatform.y;

    /* プレイヤーを追加 */
    this.playerContainer.addChild(this.character.image);
    this.character.image.x = this.character.x;
    this.character.image.y = this.character.y;

    /* 足場を追加 */
    this.createPlatform();

    this.playerContainer.addChild(this.split);
    this.split.x = this.character.image.x;
    this.split.y = this.character.image.y + 180;
    this.split.visible = false;
  };
}
