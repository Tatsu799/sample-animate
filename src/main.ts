// import { Field } from './field';
// const field = new Field();
const pos = [
  { x: 50, y: 50, num: 0 },
  { x: 200, y: 50, num: 1 },
  { x: 350, y: 50, num: 0 },
  { x: 500, y: 50, num: 2 },
];

const sleep = async (second: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, second);
  });
};

let stage = new createjs.Stage('canvas');

// let target = new createjs.Shape();
// target.graphics.beginFill('blue').drawRect(0, 0, 100, 100);
// target.setBounds(0, 0, 100, 100);
// target.x = 200;
// target.y = 200;
// stage.addChild(target);

class Target {
  mc: createjs.Shape;
  posX: number;
  posY: number;
  num: number;
  constructor(x: number, y: number, num: number) {
    this.mc = new createjs.Shape();
    this.mc.graphics.beginFill('blue').drawRect(0, 0, 100, 100);
    this.mc.setBounds(0, 0, 100, 100);
    this.posX = x;
    this.posY = y;
    this.num = num;
  }
}

let target = new Target(200, 200, 1);
stage.addChild(target.mc);
target.mc.x = target.posX;
target.mc.y = target.posY;

let target2 = new Target(400, 200, 1);
stage.addChild(target2.mc);
target2.mc.x = target2.posX;
target2.mc.y = target2.posY;

type Answer = {
  box: Target;
  checkAnswerNumber: number;
  isCorrect: boolean;
};

const _answerBox: Answer[] = [
  { box: target, checkAnswerNumber: 1, isCorrect: false },
  { box: target2, checkAnswerNumber: 2, isCorrect: false },
];

class draggEle {
  mc: createjs.Shape;
  posX: number;
  posY: number;
  answerNumber: number;
  correctFlag: boolean = false;
  // x: number = 0;
  // y: number = 0;
  constructor(x: number, y: number, answerNumber: number) {
    this.mc = new createjs.Shape();
    this.mc.graphics.beginFill('red').drawRect(0, 0, 100, 100);
    this.mc.setBounds(0, 0, 100, 100);
    this.posX = x;
    this.posY = y;
    this.answerNumber = answerNumber;
  }
}

let dragArr: draggEle[] = [];
for (let i = 0; i < 4; i++) {
  const mc = new draggEle(pos[i].x, pos[i].y, pos[i].num);
  mc.mc.x = pos[i].x;
  mc.mc.y = pos[i].y;

  dragArr.push(mc);
  stage.addChild(mc.mc);
}

let draggableX = 0;
let draggableY = 0;

const handleDown = (mc: draggEle) => {
  // const mouseEvent = event as createjs.MouseEvent;
  draggableX = stage.mouseX - mc.mc.x;
  draggableY = stage.mouseY - mc.mc.y;
};

const handleMove = (mc: draggEle) => {
  // const mouseEvent = event as createjs.MouseEvent;
  mc.mc.x = stage.mouseX - draggableX;
  mc.mc.y = stage.mouseY - draggableY;

  stage.update();
};

const handleUp = async (mc: draggEle) => {
  let p = Promise.resolve();

  _answerBox.forEach(async (_answer, i: number) => {
    checkAnswer(mc, i);
  });

  await p;

  console.log('終了');
  stage.update();
};

const checkAnswer = (dragObj: draggEle, i: number) => {
  // for (let i = 0; i < 2; i++) {

  const dragItemBounds = dragObj.mc.getBounds();
  const dragGlobal = dragObj.mc.localToGlobal(0, 0);
  const boxBounds = _answerBox[i].box.mc.getBounds();
  const boxGlobal = _answerBox[i].box.mc.localToGlobal(0, 0);

  //////////  //////////  //////////  //////////  //////////  //////////
  //ここを修正　数字はよう調整
  if (
    dragObj.mc.x < 100 ||
    dragObj.mc.x > 500 ||
    dragObj.mc.y < 100 ||
    dragObj.mc.y > 300
    // dragGlobal.x > boxGlobal.x + boxBounds.width &&
    // dragGlobal.x - dragItemBounds.width < boxGlobal.x &&
    // dragGlobal.y > boxGlobal.y - boxBounds.height &&
    // dragGlobal.y - dragItemBounds.height > boxGlobal.y
  ) {
    console.log('!!!!!!!!');
    dragObj.mc.x = dragObj.posX;
    dragObj.mc.y = dragObj.posY;
  } else if (
    dragGlobal.x < boxGlobal.x + boxBounds.width &&
    dragGlobal.x + dragItemBounds.width > boxGlobal.x &&
    dragGlobal.y < boxGlobal.y + boxBounds.height &&
    dragGlobal.y + dragItemBounds.height > boxGlobal.y
  ) {
    if (_answerBox[i].checkAnswerNumber === dragObj.answerNumber) {
      dragObj.mc.x = _answerBox[i].box.mc.x;
      dragObj.mc.y = _answerBox[i].box.mc.y;
      // dragObj.mc.mouseEnabled = false;
      // dragObj.mc.gotoAndStop(0);
      // _answerBox[i].isCorrect = true;
      // fwLib.shoCommon.playSoundEffectMaru(); //正解時の音

      console.log('重なった');
      return;
    } else if (_answerBox[i].checkAnswerNumber !== dragObj.answerNumber) {
      dragObj.mc.x = dragObj.posX;
      dragObj.mc.y = dragObj.posY;
      // dragObj.mc.gotoAndStop(0);
      // fwLib.shoCommon.playSoundEffectWrong();
      console.log('重なってない');
    }
  } else if (dragObj.answerNumber === 0) {
    dragObj.mc.x = dragObj.posX;
    dragObj.mc.y = dragObj.posY;
    // dragObj.mc.gotoAndStop(0);
    // fwLib.shoCommon.playSoundEffectWrong();
    console.log('それ以外のぶぶん２２');
  }
};

const setEvent = async () => {
  // for (const arr of dragArr) {
  //   arr.mc.on('mousedown', () => handleDown(arr));
  //   arr.mc.on('pressmove', () => handleMove(arr));
  //   arr.mc.on('pressup', () => handleUp(arr));
  // }
  dragArr.forEach((arr) => {
    arr.mc.on('mousedown', () => handleDown(arr));
    arr.mc.on('pressmove', () => handleMove(arr));
    arr.mc.on('pressup', () => handleUp(arr));
  });
};

setEvent();

stage.update();
