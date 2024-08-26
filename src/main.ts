/////////////////////////////////////////////////
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
  answered: boolean;
  constructor(x: number, y: number, num: number) {
    this.mc = new createjs.Shape();
    this.mc.graphics.beginFill('blue').drawRect(0, 0, 100, 100);
    this.mc.setBounds(0, 0, 100, 100);
    this.posX = x;
    this.posY = y;
    this.num = num;
    this.answered = false;
  }
}

let target = new Target(100, 200, 1);
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

// class draggEle {
//   mc: createjs.Shape;
//   posX: number;
//   posY: number;
//   answerNumber: number;
//   correctFlag: boolean = false;
//   // x: number = 0;
//   // y: number = 0;
//   constructor(x: number, y: number, answerNumber: number) {
//     this.mc = new createjs.Shape();
//     this.mc.graphics.beginFill('red').drawRect(0, 0, 100, 100);
//     this.mc.setBounds(0, 0, 100, 100);
//     this.posX = x;
//     this.posY = y;
//     this.answerNumber = answerNumber;
//   }
// }

// let dragArr: draggEle[] = [];
// for (let i = 0; i < 4; i++) {
//   const mc = new draggEle(pos[i].x, pos[i].y, pos[i].num);
//   mc.mc.x = pos[i].x;
//   mc.mc.y = pos[i].y;

//   dragArr.push(mc);
//   stage.addChild(mc.mc);
// }

// let draggableX = 0;
// let draggableY = 0;

// const handleDown = (mc: draggEle) => {
//   // const mouseEvent = event as createjs.MouseEvent;
//   draggableX = stage.mouseX - mc.mc.x;
//   draggableY = stage.mouseY - mc.mc.y;
// };

// const handleMove = (mc: draggEle) => {
//   // const mouseEvent = event as createjs.MouseEvent;
//   mc.mc.x = stage.mouseX - draggableX;
//   mc.mc.y = stage.mouseY - draggableY;

//   stage.update();
// };

// const handleDownAnswer = (i: number) => {
//   // const mouseEvent = event as createjs.MouseEvent;
//   for (let i = 0; i < dragArr.length; i++) {
//     draggableX = stage.mouseX - dragArr[i].mc.x;
//     draggableY = stage.mouseY - dragArr[i].mc.y;

//     // draggableX = stage.mouseX - mc.mc.x;
//     // draggableY = stage.mouseY - mc.mc.y;
//   }
// };

// const handleMoveAnswer = (i: number) => {
//   // const mouseEvent = event as createjs.MouseEvent;
//   for (let i = 0; i < dragArr.length; i++) {
//     dragArr[i].mc.x = stage.mouseX - draggableX;
//     dragArr[i].mc.y = stage.mouseY - draggableY;
//   }
//   // mc.mc.x = stage.mouseX - draggableX;
//   // mc.mc.y = stage.mouseY - draggableY;
//   stage.update();
// };

// const handleUp = async (mc: draggEle) => {
//   let p = Promise.resolve();

//   _answerBox.forEach(async (_answer, i: number) => {
//     checkAnswer(mc, i);
//   });

//   await p;

//   console.log('終了');
//   stage.update();
// };

// const handleUpAnswer = async (index: number) => {
//   // let p = Promise.resolve();

//   for (let i = 0; i < dragArr.length; i++) {
//     checkAnswer(dragArr[i], index);
//   }

//   // _answerBox.forEach(async (_answer, i: number) => {
//   //   checkAnswer(mc, i);
//   // });

//   // await p;

//   console.log('終了');
//   stage.update();
// };

// const checkAnswer = (dragObj: draggEle, i: number) => {
//   // for (let i = 0; i < 2; i++) {

//   const dragItemBounds = dragObj.mc.getBounds();
//   const dragGlobal = dragObj.mc.localToGlobal(0, 0);
//   const boxBounds = _answerBox[i].box.mc.getBounds();
//   const boxGlobal = _answerBox[i].box.mc.localToGlobal(0, 0);

//   //////////  //////////  //////////  //////////  //////////  //////////
//   //ここを修正　数字はよう調整
//   if (
//     dragObj.mc.x < 100 ||
//     dragObj.mc.x > 500 ||
//     dragObj.mc.y < 100 ||
//     dragObj.mc.y > 300
//     // dragGlobal.x > boxGlobal.x + boxBounds.width &&
//     // dragGlobal.x - dragItemBounds.width < boxGlobal.x &&
//     // dragGlobal.y > boxGlobal.y - boxBounds.height &&
//     // dragGlobal.y - dragItemBounds.height > boxGlobal.y
//   ) {
//     console.log('!!!!!!!!');
//     dragObj.mc.x = dragObj.posX;
//     dragObj.mc.y = dragObj.posY;
//   } else if (
//     dragGlobal.x < boxGlobal.x + boxBounds.width &&
//     dragGlobal.x + dragItemBounds.width > boxGlobal.x &&
//     dragGlobal.y < boxGlobal.y + boxBounds.height &&
//     dragGlobal.y + dragItemBounds.height > boxGlobal.y
//   ) {
//     if (_answerBox[i].checkAnswerNumber === dragObj.answerNumber) {
//       dragObj.mc.x = _answerBox[i].box.mc.x;
//       dragObj.mc.y = _answerBox[i].box.mc.y;
//       // dragObj.mc.mouseEnabled = false;
//       // dragObj.mc.gotoAndStop(0);
//       // _answerBox[i].isCorrect = true;
//       // fwLib.shoCommon.playSoundEffectMaru(); //正解時の音

//       console.log('重なった');
//       return;
//     } else if (_answerBox[i].checkAnswerNumber !== dragObj.answerNumber) {
//       dragObj.mc.x = dragObj.posX;
//       dragObj.mc.y = dragObj.posY;
//       // dragObj.mc.gotoAndStop(0);
//       // fwLib.shoCommon.playSoundEffectWrong();
//       console.log('重なってない');
//     }
//   } else if (dragObj.answerNumber === 0) {
//     dragObj.mc.x = dragObj.posX;
//     dragObj.mc.y = dragObj.posY;
//     // dragObj.mc.gotoAndStop(0);
//     // fwLib.shoCommon.playSoundEffectWrong();
//     console.log('それ以外のぶぶん２２');
//   }
// };

// const checkAnswer = (dragObj: draggEle, i: number) => {
//   for (let i = 0; i < _answerBox.length; i++) {
//     const poly = _answerBox[i].box.mc;
//     // const point = _answerBox[i].box.mc.globalToLocal(0, 0, dragObj.mc);
//     // const isHit = dragObj.mc.hitTest(point.x, point.y);
//     dragObj.mc.setBounds(200, 200, 200, 200);
//     const point = dragObj.mc.localToLocal(0, 0, poly);
//     const isHit = poly.hitTest(point.x, point.y);
//     console.log(isHit);
//     console.log(point.x, point.y);

//     // const x = dragObj.mc.getBounds;
//     // const y = dragObj.mc.getBounds;

//     if (isHit) {
//       if (_answerBox[i].checkAnswerNumber === dragObj.answerNumber) {
//         console.log('当たった');
//         dragObj.mc.x = _answerBox[i].box.mc.x;
//         dragObj.mc.y = _answerBox[i].box.mc.y;
//         break;
//       } else {
//         console.log('あたってない');
//         dragObj.mc.x = dragObj.posX;
//         dragObj.mc.y = dragObj.posY;
//       }
//     } else {
//       dragObj.mc.x = dragObj.posX;
//       dragObj.mc.y = dragObj.posY;
//       break;
//     }
//   }
// };

// const setEvent = () => {
//   for (const arr of dragArr) {
//     arr.mc.on('mousedown', () => handleDown(arr));
//     arr.mc.on('pressmove', () => handleMove(arr));
//     arr.mc.on('pressup', () => handleUp(arr));
//   }
//   // dragArr.forEach((arr) => {
//   //   arr.mc.on('mousedown', () => handleDown(arr));
//   //   arr.mc.on('pressmove', () => handleMove(arr));
//   //   arr.mc.on('pressup', () => handleUp(arr));
//   // });
// };

// // const setEventAnswer = () => {
// //   for (let i = 0; i < 2; i++) {
// //     // _answerBox[i].box.mc.on('mousedown', () => handleDownAnswer(i));
// //     // _answerBox[i].box.mc.on('pressmove', () => handleMoveAnswer(i));
// //     _answerBox[i].box.mc.on('pressup', () => handleUpAnswer(i));
// //   }
// // };

// // setEventAnswer();

// setEvent();

// const res = async (): Promise<unknown> => {
//   throw new Error('error');
// };

// const main = (): Promise<unknown> => {
//   try {
//     return await res();
//   } catch {
//     console.log('error');
//   } finally {
//     console.log('finaly');
//   }
// };

// main();

/////////////////////////////////////////////////

// target;
// target2;
// class Target {
//   mc: createjs.Shape;
//   posX: number;
//   posY: number;
//   num: number;
//   constructor(x: number, y: number, num: number) {
//     this.mc = new createjs.Shape();
//     this.mc.graphics.beginFill('blue').drawRect(0, 0, 100, 100);
//     this.mc.setBounds(0, 0, 100, 100);
//     this.posX = x;
//     this.posY = y;
//     this.num = num;
//   }
// }

createjs.Ticker.addEventListener('tick', handleTick);

function handleTick() {
  stage.update();
}

const answerBox1 = new createjs.Shape();
answerBox1.graphics.beginFill('grey').drawRect(0, 0, 100, 150);
stage.addChild(answerBox1);
answerBox1.x = 220;
answerBox1.y = 180;
answerBox1.alpha = 0;

const answerBox2 = new createjs.Shape();
answerBox2.graphics.beginFill('grey').drawRect(0, 0, 100, 150);
stage.addChild(answerBox2);
answerBox2.x = 520;
answerBox2.y = 180;
answerBox2.alpha = 0;

const answer1 = new createjs.Text('私は', '24px serif', 'DarkRed');
stage.addChild(answer1);
answer1.x = 240;
answer1.y = 210;
answer1.alpha = 0;

const answer2 = new createjs.Text('僕は', '24px serif', 'DarkRed');
stage.addChild(answer2);
answer2.x = 240;
answer2.y = 270;
answer2.alpha = 0;

const answer3 = new createjs.Text('私は', '24px serif', 'DarkRed');
stage.addChild(answer3);
answer3.x = 550;
answer3.y = 210;
answer3.alpha = 0;

const answer4 = new createjs.Text('僕は', '24px serif', 'DarkRed');
stage.addChild(answer4);
answer4.x = 550;
answer4.y = 270;
answer4.alpha = 0;

const answerList = [
  { list: answer1, box: 0, answer: 0 },
  { list: answer2, box: 0, answer: 1 },
  { list: answer3, box: 1, answer: 0 },
  { list: answer4, box: 1, answer: 1 },
];
const answerBoxList = [
  { box: answerBox1, num: 0 },
  { box: answerBox2, num: 1 },
];

const boxEvent = () => {
  for (let i = 0; i < _answerBox.length; i++) {
    _answerBox[i].box.mc.addEventListener('click', () => showAnswer(i));
  }
};

boxEvent();

const showAnswer = (index: number) => {
  // for (let i = 0; i < answerList.length; i++) {
  //   answerList[i].alpha = 1;
  // }
  answerBoxList[index].box.alpha = 1;
  if (index === 1) {
    answerList[2].list.alpha = 1;
    answerList[3].list.alpha = 1;
  } else {
    answerList[0].list.alpha = 1;
    answerList[1].list.alpha = 1;
  }
};

const setBoxEvent = () => {
  for (let i = 0; i < answerList.length; i++) {
    answerList[i].list.addEventListener('click', () => {
      chooseAnswer(i);
      console.log('aaa');
    });
  }
};

const chooseAnswer = (index: number) => {
  return new Promise<void>((resolve) => {
    answerList[index].list.x = answerBoxList[answerList[index].box].box.x - 100;
    answerList[index].list.y = answerBoxList[answerList[index].box].box.y + 50;

    // answerList[index].list.alpha = 0;
    // answerList[index].list.alpha = 0;
    answerBoxList[answerList[index].box].box.alpha = 0;
    _answerBox[answerList[index].box].box.mc.mouseEnabled = false;
    _answerBox[answerList[index].box].box.answered = true;

    if (_answerBox.every((flag) => flag.box.answered)) {
      resolve();
      console.log('終了');
    }
  });
};

setBoxEvent();
