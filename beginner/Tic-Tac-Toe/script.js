const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = Array(9).fill("");

function createBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.addEventListener("click", () => handleClick(index));
        div.innerText = cell;
        board.appendChild(div);
    });
}

function handleClick(index) {
    if (cells[index] !== "") return;

    cells[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    checkWinner();
    createBoard();
}

function checkWinner() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let combo of wins) {
        const [a,b,c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            statusText.innerText = `Player ${cells[a]} Wins!`;
            return;
        }
    }

    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    cells = Array(9).fill("");
    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";
    createBoard();
}

createBoard();