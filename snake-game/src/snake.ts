import { Direction, Position } from './models';

export class Snake {
  // head is position 0 of body, tail is last position
  private body: Position[];
  private boardSize: number;

  constructor(initial: Position, boardSize: number) {
    this.body = [initial];
    // CSS grid goes from 1 to n+1
    this.boardSize = boardSize + 1;
  }

  public print() {
    console.table(this.body);
  }

  // check if next position includes a body block or if it goes out bounds
  public canMoveSnake(direction: Direction): boolean {
    const nextPosition = this.nextPosition(direction);

    if (nextPosition.x <= 0 || nextPosition.x >= this.boardSize) {
      return false;
    }
    if (nextPosition.y <= 0 || nextPosition.y >= this.boardSize) {
      return false;
    }
    return !this.isPositionInBody(nextPosition);
  }

  public isPositionInBody(position: Position) {
    const repeatedBodyPosition = this.body.find(
      (curr: Position) => curr.x === position.x && curr.y === position.y
    );

    // if body has a repeated position -> return true
    return repeatedBodyPosition !== undefined;
  }

  public moveSnake(direction: Direction): {
    last: Position;
    next: Position;
    prev: Position;
  } {
    if (!this.canMoveSnake(direction)) {
      throw new Error('Snake cannot move');
    }
    const prev = this.body[0];
    const next = this.appendHead(direction);
    const last = this.body.pop()!;

    return { prev, next, last };
  }

  private nextPosition(direction: Direction): Position {
    const diff = {
      N: { x: -1, y: 0 },
      E: { x: 0, y: 1 },
      S: { x: 1, y: 0 },
      W: { x: 0, y: -1 },
    };
    const head = this.body[0];
    return {
      x: head.x + diff[direction].x,
      y: head.y + diff[direction].y,
    };
  }

  public appendHead(direction: Direction): Position {
    const next = this.nextPosition(direction);
    this.body = [next, ...this.body];
    return next;
  }

  public appendTail(position: Position): void {
    this.body = [...this.body, position];
  }

  public onlyOneBlock(): boolean {
    return this.body.length === 1;
  }
}
