const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        //initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "O")
        currentPlayer = "X";
    else
        currentPlayer = "O";

    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //chekc if winner is X
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "O";

                //disable pointer event
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know winner 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

        }
    });

    //it means we have a winner
    if(answer != "") {
        gameInfo.innerHTML = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    //if fillCount is 9
    if(fillCount === 9) {
        gameInfo.innerHTML = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClikc(index) {
    if(gameGrid[index] == "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check if palyer wins or not
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClikc(index);
    })
});

newGameBtn.addEventListener("click", initGame);