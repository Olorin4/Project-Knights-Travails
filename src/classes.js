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
    // Define possible knight moves as (rowOffset, colOffset) pairs
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
    // Input validation for start and end positions
    if (!isValidPosition(startPosition) || !isValidPosition(endPosition)) {
        return "Invalid input: both start and end positions must be within a standard 8x8 chessboard.";
    }

    // BFS setup
    const queue = [[startPosition, [startPosition]]]; // [[currentPosition, pathSoFar]]
    const visited = new Set(); // Store visited positions as strings for simplicity
    const toKey = ([row, col]) => `${row},${col}`; // Convert positions to a unique string for visited tracking

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
