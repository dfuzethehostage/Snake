import { compare } from "./helper.js";

class Snake {
  defineDir = {
    left: [0, -1],
    right: [0, 1],
    up: [-1, 0],
    down: [1, 0],
  };
  isDead = false;
  hasEatenApple = false;
  constructor(length, y, x, dir, widthOfGrid, heightOfGrid) {
    this.widthOfGrid = widthOfGrid;
    this.heightOfGrid = heightOfGrid;
    this.length = length;
    this.y = y;
    this.x = x;
    this.dir = dir;
    this.body = [[this.y, this.x]];
    for (let i = 1; i < this.length; i++) {
      let dir = this.defineDir[this.dir];
      let y = this.body[0][0];
      let x = this.body[0][1];
      const pos = [y - dir[0], x - dir[1]];
      this.body.unshift(pos);
    }
  }

  changeDir(newDir) {
    let next = this.nextMoveInDir(newDir);
    if (
      next[0] !== this.body[this.length - 2][0] ||
      next[1] !== this.body[this.length - 2][1]
    ) {
      this.dir = newDir;
    }
  }
  nextMoveInDir(dir) {
    dir = this.defineDir[dir];
    let nextY = this.y + dir[0];
    let nextX = this.x + dir[1];
    return [nextY, nextX];
  }
  eatAppleIfPossible(allApples) {
    for (let apple in allApples) {
      if (compare(allApples[apple], this.nextMoveInDir(this.dir))) {
        delete allApples[apple];
        this.hasEatenApple = true;
      }
    }
  }
  update() {
    let next = this.nextMoveInDir(this.dir);
    this.y = next[0];
    this.x = next[1];
    if (!this.hasEatenApple) {
      this.body.shift();
    } else this.length++;
    if (
      this.body.some((a) => a[0] == this.y && a[1] == this.x) ||
      this.x < 0 ||
      this.y < 0 ||
      this.x >= this.widthOfGrid ||
      this.y >= this.heightOfGrid
    ) {
      this.isDead = true;
    }
    this.body.push([this.y, this.x]);
    this.hasEatenApple = false;
  }
}

export { Snake };
