import "./normalize.css";
import "./styles.css";
import { knightMoves } from "./classes.js";

document.addEventListener("DOMContentLoaded", () => {
    const start = [0, 0]; // Top-left corner
    const end = [7, 7]; // Bottom-right corner
    console.log(knightMoves(start, end));
});
