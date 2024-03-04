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

/***/ "./src/classes.js":
/*!************************!*\
  !*** ./src/classes.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Snake: () => (/* binding */ Snake)\n/* harmony export */ });\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n\r\n\r\nclass Snake {\r\n  defineDir = {\r\n    left: [0, -1],\r\n    right: [0, 1],\r\n    up: [-1, 0],\r\n    down: [1, 0],\r\n  };\r\n  isDead = false;\r\n  hasEatenApple = false;\r\n  constructor(length, y, x, dir, widthOfGrid, heightOfGrid) {\r\n    this.widthOfGrid = widthOfGrid;\r\n    this.heightOfGrid = heightOfGrid;\r\n    this.length = length;\r\n    this.y = y;\r\n    this.x = x;\r\n    this.dir = dir;\r\n    this.body = [[this.y, this.x]];\r\n    for (let i = 1; i < this.length; i++) {\r\n      let dir = this.defineDir[this.dir];\r\n      let y = this.body[0][0];\r\n      let x = this.body[0][1];\r\n      const pos = [y - dir[0], x - dir[1]];\r\n      this.body.unshift(pos);\r\n    }\r\n  }\r\n\r\n  changeDir(newDir) {\r\n    let next = this.nextMoveInDir(newDir);\r\n    if (\r\n      next[0] !== this.body[this.length - 2][0] ||\r\n      next[1] !== this.body[this.length - 2][1]\r\n    ) {\r\n      this.dir = newDir;\r\n    }\r\n  }\r\n  nextMoveInDir(dir) {\r\n    dir = this.defineDir[dir];\r\n    let nextY = this.y + dir[0];\r\n    let nextX = this.x + dir[1];\r\n    return [nextY, nextX];\r\n  }\r\n  eatAppleIfPossible(allApples) {\r\n    for (let apple in allApples) {\r\n      if ((0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.compare)(allApples[apple], this.nextMoveInDir(this.dir))) {\r\n        delete allApples[apple];\r\n        this.hasEatenApple = true;\r\n      }\r\n    }\r\n  }\r\n  update() {\r\n    let next = this.nextMoveInDir(this.dir);\r\n    this.y = next[0];\r\n    this.x = next[1];\r\n    if (!this.hasEatenApple) {\r\n      this.body.shift();\r\n    } else this.length++; // if apple has been eaten dont shift the first part of the body so the snake grows\r\n    if (\r\n      this.body.some((a) => a[0] == this.y && a[1] == this.x) ||\r\n      this.x < 0 ||\r\n      this.y < 0 ||\r\n      this.x >= this.widthOfGrid ||\r\n      this.y >= this.heightOfGrid\r\n    ) {\r\n      this.isDead = true;\r\n    } // if snake touches body its own body it dies\r\n    this.body.push([this.y, this.x]); // move by extending the body\r\n    this.hasEatenApple = false;\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://snake/./src/classes.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   compare: () => (/* binding */ compare),\n/* harmony export */   generateGrid: () => (/* binding */ generateGrid),\n/* harmony export */   random: () => (/* binding */ random)\n/* harmony export */ });\nfunction compare(a, b) {\r\n  if (a.length !== b.length) return false;\r\n  for (let i = 0; i < a.length; i++) {\r\n    if (a[i] !== b[i]) return false;\r\n  }\r\n  return true;\r\n}\r\n\r\nfunction random(min, max) {\r\n  min = Math.ceil(min);\r\n  max = Math.floor(max);\r\n  return Math.floor(Math.random() * (max - min + 1) + min);\r\n}\r\n\r\nfunction generateGrid(height, width, filler) {\r\n  return Array(height)\r\n    .fill()\r\n    .map((row) => Array(width).fill(filler));\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://snake/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes.js */ \"./src/classes.js\");\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n\r\n\r\n\r\nconst canvas = document.getElementById(\"gameCanvas\");\r\nconst ctx = canvas.getContext(\"2d\");\r\n\r\ncanvas.width = canvas.clientWidth;\r\ncanvas.height = canvas.clientHeight;\r\n\r\nconst cols = 4;\r\nconst rows = 4;\r\nconst startingLength = 3;\r\nconst widthOfField = canvas.width / cols;\r\nconst heightOfField = canvas.height / rows;\r\n\r\nconst allApples = {};\r\nconst newSnake = new _classes_js__WEBPACK_IMPORTED_MODULE_0__.Snake(startingLength, 0, 0, \"right\", cols, rows);\r\n\r\n// apple functions\r\nfunction spawnRandomApple(clearPos) {\r\n  if (clearPos.length == 0) return;\r\n  let next = clearPos[(0,_helper_js__WEBPACK_IMPORTED_MODULE_1__.random)(0, clearPos.length - 1)];\r\n  allApples[`${next[0]},${next[1]}`] = [next[0], next[1]];\r\n}\r\nfunction drawAllApples() {\r\n  for (let apple in allApples) {\r\n    drawAppleAt(allApples[apple][0], allApples[apple][1]);\r\n  }\r\n}\r\nfunction drawAppleAt(y, x) {\r\n  ctx.fillStyle = \"red\";\r\n  const gap = 30;\r\n  ctx.fillRect(\r\n    widthOfField * x + gap / 2,\r\n    widthOfField * y + gap / 2,\r\n    widthOfField - gap,\r\n    widthOfField - gap\r\n  );\r\n}\r\n\r\n// snake functions\r\nfunction drawSnake(snake) {\r\n  const fields = snake.body;\r\n  for (let i = 0; i < snake.body.length; i++) {\r\n    ctx.fillStyle = i == snake.body.length - 1 ? \"blue\" : \"green\";\r\n    const gap = 0;\r\n    ctx.fillRect(\r\n      widthOfField * fields[i][1] + gap / 2,\r\n      widthOfField * fields[i][0] + gap / 2,\r\n      widthOfField - gap,\r\n      widthOfField - gap\r\n    );\r\n  }\r\n}\r\n\r\n// information getter functions\r\nfunction getAllClearFields(snake, allApples) {\r\n  const grid = (0,_helper_js__WEBPACK_IMPORTED_MODULE_1__.generateGrid)(cols, rows, \"\");\r\n  for (let apple in allApples) {\r\n    grid[allApples[apple][0]][allApples[apple][1]] = \"X\";\r\n  }\r\n  for (let bodyPart of snake.body) {\r\n    grid[bodyPart[0]][bodyPart[1]] = \"X\";\r\n  }\r\n  const allClearPos = [];\r\n  for (let i = 0; i < grid[0].length; i++) {\r\n    for (let j = 0; j < grid.length; j++) {\r\n      if (grid[j][i] == \"\") allClearPos.push([j, i]);\r\n    }\r\n  }\r\n  return allClearPos;\r\n}\r\n\r\n// initiate game\r\nlet gameState = \"running\";\r\nspawnRandomApple(getAllClearFields(newSnake, allApples));\r\ndrawAllApples();\r\ndrawSnake(newSnake);\r\n\r\n//game loop\r\n\r\nsetInterval(() => {\r\n  document.addEventListener(\"keydown\", function (event) {\r\n    if (event.key === \"ArrowLeft\") {\r\n      newSnake.changeDir(\"left\");\r\n    } else if (event.key === \"ArrowRight\") {\r\n      newSnake.changeDir(\"right\");\r\n    } else if (event.key === \"ArrowUp\") {\r\n      newSnake.changeDir(\"up\");\r\n    } else if (event.key === \"ArrowDown\") {\r\n      newSnake.changeDir(\"down\");\r\n    }\r\n  });\r\n  if (gameState == \"running\") {\r\n    const allClearPos = getAllClearFields(newSnake, allApples);\r\n    if (allClearPos.length == 0) gameState = \"you won\";\r\n\r\n    newSnake.eatAppleIfPossible(allApples);\r\n    if (newSnake.hasEatenApple) spawnRandomApple(allClearPos);\r\n\r\n    newSnake.update();\r\n\r\n    if (newSnake.isDead) gameState = \"game over\";\r\n    else {\r\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n      drawAllApples();\r\n      drawSnake(newSnake);\r\n    }\r\n  }\r\n  if (gameState !== \"running\") console.log(gameState);\r\n}, 500);\r\n\n\n//# sourceURL=webpack://snake/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;