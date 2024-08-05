// import { Field } from './field';
// const field = new Field();
const pos = [
  { x: 50, y: 50 },
  { x: 200, y: 50 },
];

let stage = new createjs.Stage('canvas');

let target = new createjs.Shape();
target.graphics.beginFill('blue').drawRect(0, 0, 100, 100);
target.setBounds(0, 0, 100, 100);
target.x = 200;
target.y = 200;
stage.addChild(target);

class draggEle {
  ele: createjs.Shape;
  posX: number;
  posY: number;
  // x: number = 0;
  // y: number = 0;
  constructor(x: number, y: number) {
    this.ele = new createjs.Shape();
    this.ele.graphics.beginFill('red').drawRect(0, 0, 100, 100);
    this.ele.setBounds(0, 0, 100, 100);
    this.posX = x;
    this.posY = y;
  }
}

let dragArr: draggEle[] = [];
for (let i = 0; i < 2; i++) {
  const ele = new draggEle(pos[i].x, pos[i].y);
  ele.ele.x = pos[i].x;
  ele.ele.y = pos[i].y;

  dragArr.push(ele);
  stage.addChild(ele.ele);
}

console.log(dragArr);

// let draggable = new createjs.Shape();
// draggable.graphics.beginFill('red').drawRect(0, 0, 100, 100);
// draggable.setBounds(0, 0, 100, 100);
// draggable.x = 50;
// draggable.y = 50;
// stage.addChild(draggable);

// let draggable2 = new createjs.Shape();
// draggable2.graphics.beginFill('green').drawRect(0, 0, 100, 100);
// draggable2.setBounds(0, 0, 100, 100);
// draggable2.x = 200;
// draggable2.y = 50;
// stage.addChild(draggable2);

// const dragArr = [draggable, draggable2];

let draggableX = 0;
let draggableY = 0;

const handleDown = (Ele: draggEle) => {
  // const mouseEvent = event as createjs.MouseEvent;
  draggableX = stage.mouseX - Ele.ele.x;
  draggableY = stage.mouseY - Ele.ele.y;
};

const handleMove = (Ele: draggEle) => {
  // const mouseEvent = event as createjs.MouseEvent;
  Ele.ele.x = stage.mouseX - draggableX;
  Ele.ele.y = stage.mouseY - draggableY;
  stage.update();
};

const handleUp = (Ele: draggEle) => {
  // const mouseEvent = event as createjs.MouseEvent;
  const draggableBounds = Ele.ele.getBounds();
  const targetBounds = target.getBounds();

  if (draggableBounds && targetBounds) {
    // ドラッグ対象のグローバルな位置に対して、境界を考慮
    const draggableGlobal = Ele.ele.localToGlobal(0, 0);
    const targetGlobal = target.localToGlobal(0, 0);

    // ドロップターゲットにオブジェクトが重なっているかを確認
    if (
      draggableGlobal.x < targetGlobal.x + targetBounds.width &&
      draggableGlobal.x + draggableBounds.width > targetGlobal.x &&
      draggableGlobal.y < targetGlobal.y + targetBounds.height &&
      draggableGlobal.y + draggableBounds.height > targetGlobal.y
    ) {
      // ドロップが成功した場合、ターゲットの中央に配置
      Ele.ele.x = targetGlobal.x + (targetBounds.width - draggableBounds.width) / 2;
      Ele.ele.y = targetGlobal.y + (targetBounds.height - draggableBounds.height) / 2;
    } else {
      Ele.ele.x = Ele.posX;
      Ele.ele.y = Ele.posY;
    }
  }
  stage.update();
};

const setEvent = () => {
  for (const arr of dragArr) {
    arr.ele.on('mousedown', () => handleDown(arr));
    arr.ele.on('pressmove', () => handleMove(arr));
    arr.ele.on('pressup', () => handleUp(arr));
  }
};

setEvent();

stage.update();
