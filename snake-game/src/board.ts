import { Direction, Position } from './models';
import { Snake } from './snake';

export class Board {
  initialSnakeHead: Position;

  snake: Snake;
  food: Position = { x: 0, y: 0 };
  direction: Direction = 'N';
  nextDirection: Direction = this.direction;
  boardSize: number = 20;

  constructor(boardSize: number) {
    this.boardSize = boardSize;
    const middle = Math.floor(boardSize / 2);
    this.initialSnakeHead = { x: middle, y: middle };
    this.snake = new Snake(this.initialSnakeHead, boardSize);
    this.attachEventListeners();
    this.clearBoard();
    this.drawBoard();
  }

  attachEventListeners() {
    const handleKeyDown = (event: KeyboardEvent) => {
      const possibleDirections = {
        ArrowLeft: 'W',
        ArrowRight: 'E',
        ArrowUp: 'N',
        ArrowDown: 'S',
      };
      if (!(event.key in possibleDirections)) {
        return;
      }

      // @ts-ignore
      const nextPossible: Direction = possibleDirections[event.key];
      const contrary = { N: 'S', E: 'W', S: 'N', W: 'E' };

      if (
        this.snake.onlyOneBlock() ||
        contrary[nextPossible] !== this.direction
      ) {
        this.nextDirection = nextPossible;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  }

  clearBoard() {
    document.querySelectorAll('.snake').forEach((div) => div.remove());
    document.querySelectorAll('.food').forEach((div) => div.remove());
  }

  drawBoard() {
    const repeat = `repeat( ${this.boardSize}, 1fr)`;

    const board = document.querySelector<HTMLDivElement>('#board')!;
    board.style.setProperty('grid-template-columns', repeat);
    board.style.setProperty('grid-template-rows', repeat);

    this.moveHead(this.initialSnakeHead);
    this.placeFood();

    const smallSize = (5 / this.boardSize).toFixed(4);
    const mediumSize = (10 / this.boardSize).toFixed(4);
    const largeSize = (15 / this.boardSize).toFixed(4);

    const rightEye = document.querySelector<HTMLDivElement>('.right-eye')!;
    rightEye.style.width = `${mediumSize}vmin`;
    rightEye.style.height = `${largeSize}vmin`;
    rightEye.style.borderRadius = `${largeSize}vmin / ${mediumSize}vmin `;
    rightEye.style.top = `${smallSize}vmin`;
    rightEye.style.right = `${smallSize}vmin`;

    const leftEye = document.querySelector<HTMLDivElement>('.left-eye')!;
    leftEye.style.width = `${mediumSize}vmin`;
    leftEye.style.height = `${largeSize}vmin`;
    leftEye.style.borderRadius = `${largeSize}vmin / ${mediumSize}vmin `;
    leftEye.style.top = `${smallSize}vmin`;
    leftEye.style.left = `${smallSize}vmin`;
  }

  /**
   * calculate next move and draw it
   * @returns true if game is over
   */
  nextTurn(): { isGameOver: boolean; hasEaten?: boolean } {
    this.direction = this.nextDirection;

    if (!this.snake.canMoveSnake(this.direction)) {
      return { isGameOver: true };
    }
    const { last, next, prev } = this.snake.moveSnake(this.direction);
    this.moveHead(next);
    drawBlock(prev, 'snake');

    if (this.food.x === next.x && this.food.y === next.y) {
      // snake.appendHead(this.direction);
      this.snake.appendTail(last);

      this.placeFood();
      return { isGameOver: false, hasEaten: true };
    }

    // it did not found food, remove the last element
    removeBlock(last);
    return { isGameOver: false, hasEaten: false };
  }

  placeFood() {
    document.querySelector('.food')?.remove();

    do {
      // CSS grids start at 1
      const x = Math.floor(Math.random() * this.boardSize) + 1;
      const y = Math.floor(Math.random() * this.boardSize) + 1;
      this.food = { x, y };
    } while (this.snake.isPositionInBody(this.food));

    drawBlock(this.food, 'food');
  }

  moveHead(position: Position) {
    const rotation = {
      N: 'rotate(0)',
      E: 'rotate(90deg)',
      S: 'rotate(180deg)',
      W: 'rotate(270deg)',
    };

    const head = document.querySelector<HTMLDivElement>('.head')!;
    head.style.gridRowStart = `${position.x}`;
    head.style.gridColumnStart = `${position.y}`;
    head.style.transform = rotation[this.direction];
  }
}

function drawBlock(position: Position, blockType: 'food' | 'snake') {
  const block = document.createElement('div');
  block.classList.add(blockType);
  block.classList.add(`pos-${position.x}-${position.y}`);
  block.style.gridRowStart = `${position.x}`;
  block.style.gridColumnStart = `${position.y}`;
  document.querySelector<HTMLDivElement>('#board')?.appendChild(block);
}

function removeBlock(position?: Position) {
  document.querySelector(`.pos-${position?.x}-${position?.y}`)?.remove();
}
