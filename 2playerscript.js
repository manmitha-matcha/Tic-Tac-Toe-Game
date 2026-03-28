document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector(".reset");
    let newBtn = document.querySelector(".new");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector(".msg");
    let turnO = true;
    let count = 0;
    const winPatterns = [
        [0,1,2],[0,3,6],[0,4,8],
        [1,4,7],[2,5,8],[2,4,6],
        [3,4,5],[6,7,8]
    ];
    const resetGame = () => {
        turnO = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
    };
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            box.disabled = true;
            count++;
            chkWinner();
        });
    });
    const chkWinner = () => {
        for (let pattern of winPatterns) {
            let [a,b,c] = pattern;
            let p1 = boxes[a].innerText;
            let p2 = boxes[b].innerText;
            let p3 = boxes[c].innerText;
            if (p1 && p1 === p2 && p2 === p3) {
                showWinner(p1);
                return;
            }
        }
        if (count === 9) draw();
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
        msg.innerText = `Winner: ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };
    const draw = () => {
        msg.innerText = "It's a draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
    };
    if (resetBtn) resetBtn.addEventListener("click", resetGame);
    if (newBtn) newBtn.addEventListener("click", resetGame);
    const toggle = document.querySelector("#themeToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("light");
        });
    }
});