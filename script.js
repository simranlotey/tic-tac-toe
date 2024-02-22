let currentPlayer = 1;
const boxes = document.querySelectorAll(".box");
const players = document.querySelectorAll(".players img");
const celebration = document.querySelector(".celebrate");
let gameOver = false;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin(player) {
    return winConditions.some((combination) => {
        return combination.every((index) => {
            return (
                boxes[index].querySelector("img") &&
                boxes[index].querySelector("img").alt === player
            );
        });
    });
}

function handleWin(player) {
    const playerName =
        player === "Player 1" ? "./images/Player 1.png" : "./images/Player 2.png";
    const winnerText = ` is winner!`;

    const img = document.createElement("img");
    img.src = playerName;
    img.alt = "Winner";
    const mediaQueryWidth = window.matchMedia("(max-width: 475px)").matches
        ? 30
        : 40;
    const mediaQueryHeight = window.matchMedia("(max-width: 475px)").matches
        ? 30
        : 40;

    img.width = mediaQueryWidth;
    img.height = mediaQueryHeight;

    const winnerElement = document.querySelector(".winner");
    const heading = document.createElement("h2");
    winnerElement.innerHTML = "";
    heading.textContent = winnerText;
    img.style.display = "inline";
    heading.style.display = "inline";
    winnerElement.appendChild(img);
    winnerElement.appendChild(heading);
    winnerElement.style.display = "block";
    document.getElementById("play-again-button").style.display = "block";
    celebration.style.display = "block";
    gameOver = true;
}

function handleDraw() {
    const winnerElement = document.querySelector(".winner");
    const drawText = `It's a draw!`;
    const heading = document.createElement("h2");
    winnerElement.innerHTML = "";
    heading.textContent = drawText;
    heading.style.display = "inline";
    winnerElement.appendChild(heading);
    winnerElement.style.display = "block";

    document.getElementById("play-again-button").style.display = "block";
    gameOver = true;
}

function handleClick(index) {
    if (!gameOver && !boxes[index].querySelector("img")) {
        const player = currentPlayer === 1 ? "Player 1" : "Player 2";
        const svgImage =
            currentPlayer === 1 ? "./images/Player 1.png" : "./images/Player 2.png";
        const img = document.createElement("img");
        img.src = svgImage;
        img.alt = player;
        const mediaQueryWidth = window.matchMedia("(max-width: 475px)").matches
            ? 50
            : 70;
        const mediaQueryHeight = window.matchMedia("(max-width: 475px)").matches
            ? 50
            : 70;

        img.width = mediaQueryWidth;
        img.height = mediaQueryHeight;
        boxes[index].appendChild(img);
        if (checkWin(player)) {
            handleWin(player);
        } else if (Array.from(boxes).every((box) => box.querySelector("img"))) {
            handleDraw();
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }
    }
}

function playAgain() {
    currentPlayer = 1;
    gameOver = false;
    boxes.forEach((box) => {
        box.textContent = "";
    });
    document.querySelector(".winner").style.display = "none";
    document.getElementById("play-again-button").style.display = "none";
    celebration.style.display = "none";
}
