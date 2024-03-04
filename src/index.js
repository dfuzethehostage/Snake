import { Snake } from "./classes.js";
import { random, generateGrid } from "./helper.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const cols = 4;
const rows = 4;
const startingLength = 3;
const widthOfField = canvas.width / cols;
const heightOfField = canvas.height / rows;

const allApples = {};
const newSnake = new Snake(startingLength, 0, 0, "right", cols, rows);

// apple functions
function spawnRandomApple(clearPos) {
  if (clearPos.length == 0) return;
  let next = clearPos[random(0, clearPos.length - 1)];
  allApples[`${next[0]},${next[1]}`] = [next[0], next[1]];
}
function drawAllApples() {
  for (let apple in allApples) {
    drawAppleAt(allApples[apple][0], allApples[apple][1]);
  }
}
function drawAppleAt(y, x) {
  ctx.fillStyle = "red";
  const gap = 30;
  ctx.fillRect(
    widthOfField * x + gap / 2,
    widthOfField * y + gap / 2,
    widthOfField - gap,
    widthOfField - gap
  );
}

// snake functions
function drawSnake(snake) {
  const fields = snake.body;
  for (let i = 0; i < snake.body.length; i++) {
    ctx.fillStyle = i == snake.body.length - 1 ? "blue" : "green";
    const gap = 0;
    ctx.fillRect(
      widthOfField * fields[i][1] + gap / 2,
      widthOfField * fields[i][0] + gap / 2,
      widthOfField - gap,
      widthOfField - gap
    );
  }
}

// information getter functions
function getAllClearFields(snake, allApples) {
  const grid = generateGrid(cols, rows, "");
  for (let apple in allApples) {
    grid[allApples[apple][0]][allApples[apple][1]] = "X";
  }
  for (let bodyPart of snake.body) {
    grid[bodyPart[0]][bodyPart[1]] = "X";
  }
  const allClearPos = [];
  for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] == "") allClearPos.push([j, i]);
    }
  }
  return allClearPos;
}

// initiate game
let gameState = "running";
spawnRandomApple(getAllClearFields(newSnake, allApples));
drawAllApples();
drawSnake(newSnake);

//game loop

setInterval(() => {
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      newSnake.changeDir("left");
    } else if (event.key === "ArrowRight") {
      newSnake.changeDir("right");
    } else if (event.key === "ArrowUp") {
      newSnake.changeDir("up");
    } else if (event.key === "ArrowDown") {
      newSnake.changeDir("down");
    }
  });
  if (gameState == "running") {
    const allClearPos = getAllClearFields(newSnake, allApples);
    if (allClearPos.length == 0) gameState = "you won";

    newSnake.eatAppleIfPossible(allApples);
    if (newSnake.hasEatenApple) spawnRandomApple(allClearPos);

    newSnake.update();

    if (newSnake.isDead) gameState = "game over";
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawAllApples();
      drawSnake(newSnake);
    }
  }
  if (gameState !== "running") console.log(gameState);
}, 500);
