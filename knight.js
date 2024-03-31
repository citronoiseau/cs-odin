function createBoard(size = 8) {
  const board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = 0;
    }
  }

  function getBoard(x, y) {
    return board[x][y];
  }

  function setVisited(x, y) {
    board[x][y] = 1;
  }

  return {
    getBoard,
    setVisited,
  };
}
const board = createBoard();

class Knight {
  constructor(start, end, path = []) {
    this.start = start;
    this.end = end;
    this.path = path;
  }

  travail() {
    this.checkStartAndEnd();
    this.path.push(this.start);

    board.setVisited(this.start[0], this.start[1]);
    const queue = [];
    queue.push([this.start, []]);

    while (queue.length) {
      const [currentPosition, currentPath] = queue.shift();
      const [x, y] = currentPosition;

      if (x === this.end[0] && y === this.end[1]) {
        this.path = [...currentPath, currentPosition];
        console.log("Your path:", this.path);
        return this.path;
      }

      const possibleMoves = this.findPath(currentPosition);
      for (const move of possibleMoves) {
        const [nextX, nextY] = move;
        board.setVisited(nextX, nextY);
        const newPath = [...currentPath, currentPosition];
        queue.push([move, newPath]);
      }
    }
  }

  findPath(currentPosition) {
    let [x, y] = currentPosition;
    const moves = [
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x + 2, y + 1],
      [x - 2, y - 1],
      [x - 1, y + 2],
      [x + 1, y - 2],
      [x + 1, y + 2],
      [x - 1, y - 2],
    ];
    return moves.filter(
      (move) =>
        move[0] >= 0 &&
        move[1] >= 0 &&
        move[0] < 8 &&
        move[1] < 8 &&
        board.getBoard(move[0], move[1]) === 0
    );
  }
  checkStartAndEnd() {
    const [x, y] = this.start;
    const [x2, y2] = this.end;
    if (x > 8 || x < 0 || y > 8 || y < 0) {
      console.log("Invalid starting point!");
    }
    if (x2 > 8 || x2 < 0 || y2 > 8 || y2 < 0) {
      console.log("Invalid ending point!");
    }
  }
}

//tests
const knight = new Knight([0, 0], [7, 7]);
knight.travail();
