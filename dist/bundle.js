/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (() => {

eval("\nconst canvas = document.getElementById('canvas');\nconst stage = new createjs.Stage(canvas);\nconst player = new createjs.Shape();\nplayer.graphics.beginFill('red').drawRect(0, 0, 50, 50);\nplayer.x = canvas.width / 2 - 25;\nplayer.y = canvas.height - 100;\nstage.addChild(player);\nconst leftWall = new createjs.Shape();\nleftWall.graphics.beginFill('gray').drawRect(0, 0, 50, canvas.height);\nleftWall.x = 0;\nleftWall.y = 0;\nstage.addChild(leftWall);\nconst rightWall = new createjs.Shape();\nrightWall.graphics.beginFill('gray').drawRect(0, 0, 50, canvas.height);\nrightWall.x = canvas.width - 50;\nrightWall.y = 0;\nstage.addChild(rightWall);\nconst obstacles = [];\nfunction createObstacle() {\n    const obstacle = new createjs.Shape();\n    obstacle.graphics.beginFill('blue').drawRect(0, 0, 100, 20);\n    obstacle.x = Math.random() * (canvas.width - 200) + 50;\n    obstacle.y = canvas.height;\n    stage.addChild(obstacle);\n    obstacles.push(obstacle);\n}\nlet moveLeft = false;\nlet moveRight = false;\nwindow.addEventListener('keydown', (event) => {\n    if (event.key === 'ArrowLeft') {\n        moveLeft = true;\n    }\n    else if (event.key === 'ArrowRight') {\n        moveRight = true;\n    }\n});\nwindow.addEventListener('keyup', (event) => {\n    if (event.key === 'ArrowLeft') {\n        moveLeft = false;\n    }\n    else if (event.key === 'ArrowRight') {\n        moveRight = false;\n    }\n});\ncreatejs.Ticker.framerate = 60;\ncreatejs.Ticker.addEventListener('tick', handleTick);\nfunction handleTick(event) {\n    if (moveLeft && player.x > 50) {\n        player.x -= 5;\n    }\n    if (moveRight && player.x < canvas.width - 100) {\n        player.x += 5;\n    }\n    player.y -= 2;\n    for (let i = 0; i < obstacles.length; i++) {\n        obstacles[i].y -= 2;\n        if (obstacles[i].y < 0) {\n            stage.removeChild(obstacles[i]);\n            obstacles.splice(i, 1);\n            i--;\n        }\n    }\n    if (Math.random() < 0.03) {\n        createObstacle();\n    }\n    stage.update();\n}\n\n\n//# sourceURL=webpack://ts_base/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.ts"]();
/******/ 	
/******/ })()
;