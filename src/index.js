import "./normalize.css";
import "./styles.css";
import { knightMoves } from "./classes.js";

document.addEventListener("DOMContentLoaded", () => {
    knightMoves([0, 0], [7, 7]); // Test case
    knightMoves([3, 3], [4, 3]); // Another test case
    knightMoves([0, 0], [8, 8]); // Invalid case
});
