/*  In this problem, the chessboard can be represented as a graph:
    Each square on the board is a node (or vertex). A knight’s valid moves from any 
    square represent the edges. Thus, the problem of finding the shortest path for the
    knight’s movement becomes a graph traversal problem. The goal is to traverse the
    graph (the chessboard) to find the shortest route between two nodes (the start and
    end positions).

    While solving this problem, you don’t need to explicitly create a graph object with
    vertices and edges. Instead, you can think of the graph as implicit.
*/

class Board {
    constructor(size = 8) {
        this.size = size; // Default chessboard is 8x8
    }

    // Method to check if a position is valid on the board
    isValid([row, col]) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    // Method to display the path in a formatted way
    displayPath(path) {
        console.log(
            `You made it in ${path.length - 1} moves! Here's your path:`
        );
        path.forEach((position) => console.log(position));
    }
}

export function knightMoves(startPosition, endPosition) {
    // 1. Create chessboard
    const board = new Board(); // Create a chessboard instance

    // 2. Define possible knight moves as (rowOffset, colOffset) pairs
    const knightMoves = [
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
    ];

    // Input validation for start and end positions
    if (!board.isValid(startPosition) || !board.isValid(endPosition)) {
        console.log(
            "Invalid input: both start and end positions must be within a standard 8x8 chessboard."
        );
        return;
    }

    // Create a 2D array to track visited positions
    const visited = Array.from({ length: board.size }, () =>
        Array(board.size).fill(false)
    );

    // Queue for BFS: stores [currentPosition, pathSoFar]
    const queue = [[startPosition, [startPosition]]];

    // BFS traversal
    while (queue.length > 0) {
        const [currentPosition, path] = queue.shift(); // Dequeue the first element
        const [currentRow, currentCol] = currentPosition;
        // If we reach the end position, display the path and exit
        if (currentRow === endPosition[0] && currentCol === endPosition[1]) {
            board.displayPath(path);
            return;
        }

        // Mark the current position as visited
        visited[currentRow][currentCol] = true;

        // Explore all valid knight moves from the current position
        for (const [rowOffset, colOffset] of knightMoves) {
            const nextPosition = [
                currentRow + rowOffset,
                currentCol + colOffset,
            ];
            const [nextRow, nextCol] = nextPosition;
            // Add the position to the queue if it's valid and not yet visited
            if (board.isValid(nextPosition) && !visited[nextRow][nextCol]) {
                queue.push([nextPosition, [...path, nextPosition]]);
            }
        }
    }
}
