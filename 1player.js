document.addEventListener("DOMContentLoaded", () => {
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let turnO = true;
let isComputerGame = true;
let count = 0;
let gameOver = false;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const resetGame = () => {
    turnO = true;
    count = 0;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || gameOver) return;
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        chkWinner();
        if (isComputerGame && !turnO && !gameOver) {
            setTimeout(computerMove, 500);
        }
    });
});
const chkWinner = () => {
    for (let pattern of winPatterns) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;
        if (p1 !== "" && p2 !== "" && p3 !== "") {
            if (p1 === p2 && p2 === p3) {
                showWinner(p1);
                return;
            }
        }
    }
    if (count === 9 && !gameOver) {
        draw();
    }
};
const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });
    if (emptyBoxes.length === 0 || gameOver) return;
    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].disabled = true;
    count++;
    turnO = true;
    chkWinner();
};
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};
const showWinner = (winner) => {
    gameOver = true;
    msg.innerText = `Congratulations!!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const draw = () => {
    gameOver = true;
    msg.innerText = "It's a draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const toggle = document.querySelector("#themeToggle");
if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });
}
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
}
if (newBtn) newBtn.addEventListener("click", resetGame);
if (resetBtn) resetBtn.addEventListener("click", resetGame);

});