let player1 = prompt("Enter name for player who will play O:", "Player O");
let player2 = prompt("Enter name for player who will play X:", "Player X");

//input is not null, not empty
player1 = player1 && player1.trim() ? player1.trim() : "Player O";
player2 = player2 && player2.trim() ? player2.trim() : "Player X";

const players = {
    O: player1,
    X: player2
};

let boxes = document.querySelectorAll(".box");
let newg = document.querySelector("#new");
let msgc = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;  //playerX, playerO
let count=0;  // draw a match

const winCase = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    turn0 = true;
    count=0;
    enabledboxes();
    msgc.classList.add("hide");
    msg.innerText="";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){  //player 0 turn
            box.innerText = "O";
            box.style.color="brown";
            turn0=false;
        }
        else{   //player x turn
            box.innerText ="X";
            box.style.color="blue";
            turn0=true;
        }
        box.disabled = true;  // disabling the box , so again can't change it
        count++;
        let isWinner=checkwinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Tie.`;
    msgc.classList.remove("hide");
    disabledboxes();
}

const disabledboxes = () => {
    for(let box of boxes){
        box.disabled =  true;
    }
};

const enabledboxes = () => {
    for(let box of boxes){
        box.disabled =  false;
        box.innerText = "";
        box.style.color="";
    }
};

const showWinner = (winner) => {
    const winnerName = players[winner] || winner;
    msg.innerText = `Congratulations! Winner is ${winnerName}.`;
    msgc.classList.remove("hide");
    disabledboxes();
};

const checkwinner = () => {
    for(let pat of winCase){
        let p1 = boxes[pat[0]].innerText;
        let p2 = boxes[pat[1]].innerText;
        let p3 = boxes[pat[2]].innerText;

        if(p1 != "" && p2 != "" && p3 != ""){
            if(p1 === p2 && p2 === p3)
            {
                showWinner(p1);
                return true;
            }
        }
        }    
        return false;
};

newg.addEventListener("click",resetGame);