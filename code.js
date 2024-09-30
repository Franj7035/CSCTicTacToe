const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Initialize the game when the page loads
initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    // Check if the cell is already clicked or the game is not running
    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer; // Update the cell with the current player's mark
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X"; // Switch player
    statusText.textContent = `${currentPlayer}'s turn`; // Update status text
}

function checkWinner() {
    let roundWon = false;

    // Check each winning condition
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // Check if the cells are filled and match
        if (cellA === "" || cellB === "" || cellC === "") {
            continue; // Skip if any cell is empty
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true; // Found a winner
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false; // Stop the game
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false; // Stop the game
    } else {
        changePlayer(); // Change player if no winner
    }
}

function restartGame() {
    currentPlayer = "X"; // Reset to player X
    options = ["", "", "", "", "", "", "", "", ""]; // Reset options
    statusText.textContent = `${currentPlayer}'s turn`; // Update status
    cells.forEach(cell => cell.textContent = ""); // Clear the cells
    running = true; // Restart the game
}
