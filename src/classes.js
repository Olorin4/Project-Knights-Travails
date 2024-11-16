/*  In this problem, the chessboard can be represented as a graph:
    Each square on the board is a node (or vertex). A knight’s valid moves from any 
    square represent the edges. Thus, the problem of finding the shortest path for the
    knight’s movement becomes a graph traversal problem. The goal is to traverse the
    graph (the chessboard) to find the shortest route between two nodes (the start and
    end positions).

    While solving this problem, you don’t need to explicitly create a graph object with
    vertices and edges. Instead, you can think of the graph as implicit.
*/

// class Board {
//     constructor() {
//         square =
//     }
// }

export function knightMoves(startPosition, endPosition) {
    /* Shows the shortest possible way to get from one square to another by outputting
    all squares the knight will stop along the way. Will dynamically explore all 
    possible moves (edges) to other vertices (positions on the board) as it traverses the
    board. */

    // 1. Create 8x8 board with 64 squares, each square having axb coordinates
    /*  2. Create rule for the movement of the knight
    Define possible knight moves as (rowOffset, colOffset) pairs */
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
    // Check if a position is valid on the chessboard
    const isValidPosition = ([row, col]) =>
        row >= 0 && row < 8 && col >= 0 && col < 8;
    // 3. Traverse all possible moves from the current square to other squares, choose a  data structure that will allow you to work with every possible move. Decide which search algorithm is best to use for this case
    // 4. Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square.
    // BFS setup
    const queue = [[startPosition, [startPosition]]]; // [[currentPosition, pathSoFar]]
    const visited = new Set();
    // Convert positions to a unique string for visited tracking
    const toKey = ([row, col]) => `${row},${col}`;
    // Start BFS traversal
    while (queue.length > 0) {
        const [currentPosition, path] = queue.shift();
        const [currentRow, currentCol] = currentPosition;
        // If the current position matches the target, return the path
        if (currentRow === endPosition[0] && currentCol === endPosition[1]) {
            return path;
        }

        // Mark the current position as visited
        visited.add(toKey(currentPosition));

        // Explore all valid knight moves from the current position
        for (const [rowOffset, colOffset] of knightMoves) {
            const nextPosition = [
                currentRow + rowOffset,
                currentCol + colOffset,
            ];

            if (
                isValidPosition(nextPosition) &&
                !visited.has(toKey(nextPosition))
            ) {
                queue.push([nextPosition, [...path, nextPosition]]);
            }
        }
    }

    // If no path is found (which shouldn't happen on a valid chessboard), return an empty array
    return [];
}
