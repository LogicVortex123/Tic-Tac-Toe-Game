const board = Array(9).fill("");
const option = document.querySelectorAll(".option");
const status = document.getElementById("status");
let replayButton = document.getElementById("restart");
let gameOver = false;

function checkWinner() {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], 
        [0, 4, 8],
        [2, 4, 6] 
    ];

     for (let i = 0; i < wins.length; i++) {
        let combo = wins[i];
        const a = combo[0];
        const b = combo[1];
        const c = combo[2];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;
            move.textContent = `${board[a]} wins!`;
            document.body.appendChild(replayButton);
            return;
        }
    }


    for (let i = 0; i < 9; i++) {}
    if (!board.includes("")) {
        gameOver = true;
        move.textContent = "It's a draw!";
        document.body.appendChild(replayButton);
    }
}

replayButton.addEventListener("click", () => {
    window.location.reload();
})

function botMove() {
    let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
    if (emptyIndices.length === 0 || gameOver) return;

    let randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randIndex] = "O";
    option[randIndex].textContent = "O";
    checkWinner();
}

replayButton.remove();

option.forEach((option, idx) => {
    option.addEventListener("click", () => {
        if (board[idx] === "" && !gameOver) {
            board[idx] = "X";
            option.textContent = "X";
            checkWinner();
            if (!gameOver) {
                move.textContent = "Your move: O";
                setTimeout(() => {
                    if (!gameOver) {
                        botMove();
                        move.textContent = "Your move: X";
                    }
                }, Math.random() * 1000); 
            }
        }
    });
});