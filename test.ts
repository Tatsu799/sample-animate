// private async checkAnswer(dragObj: dragObj) {
//   for (let i = 0; i < 2; i++) {
//   const dragItemBounds = dragObj.mc.getBounds();
//   const boxBounds = this._answerBox[i].pos;
//   const draggableGlobal = dragObj.mc.localToGlobal(0, 0);
//   const targetGlobal = this._answerBox[i].box.localToGlobal(0, 0);
//   if (
//     draggableGlobal.x < targetGlobal.x + (boxBounds.width - 40) &&
//     draggableGlobal.x + (dragItemBounds.width - 45) > targetGlobal.x &&
//     draggableGlobal.y < targetGlobal.y + (boxBounds.height - 50) &&
//     draggableGlobal.y + (dragItemBounds.height - 50) > targetGlobal.y
//   ) {
//       if (this._answerBox[i].checkAnswerNumber === dragObj.answerNumber && !this._answerBox[i].isCorrect) {
//           dragObj.mc.x = this._answerBox[i].box.x - 1;
//           dragObj.mc.y = this._answerBox[i].box.y + 4;
//           dragObj.mc.mouseEnabled = false;
//           dragObj.mc.gotoAndStop(0);
//           this._answerBox[i].isCorrect = true;
//           fwLib.shoCommon.playSoundEffectMaru(); //正解時の音
//           console.log('重なった')
//           return;
//       }
//       else {
//           dragObj.mc.x = dragObj.posX;
//           dragObj.mc.y = dragObj.posY;
//           dragObj.mc.gotoAndStop(0);
//           fwLib.shoCommon.playSoundEffectWrong();
//           console.log('重なってない')
//       }
//   }
//   else if (!this._answerBox[i].isCorrect && dragObj.answerNumber === 0) {
//       dragObj.mc.x = dragObj.posX;
//       dragObj.mc.y = dragObj.posY;
//       dragObj.mc.gotoAndStop(0);
//       fwLib.shoCommon.playSoundEffectWrong();
//       console.log('それ以外のぶぶん２２')
//   }
//   else if (dragObj.answerNumber === 0) {
//       dragObj.mc.x = dragObj.posX;
//       dragObj.mc.y = dragObj.posY;
//       dragObj.mc.gotoAndStop(0);
//       console.log('それ以外のぶぶん３３３')
//   }

//   }
// }
