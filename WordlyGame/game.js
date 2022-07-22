function createBoard(){
    let board = document.getElementById("game-board")
    board.innerHTML=`<p>welcome to the wordly game!</p>`
}

createBoard();



// function initBoard() {
//     let board = document.getElementById("game-board");

//     for (let i = 0; i < 6; i++) {
//         let row = document.createElement("div")
//         row.className = "letter-row"

//         for (let j = 0; j < 5; j++) {
//             let box = document.createElement("div")
//             box.className = "letter-box"
//             row.appendChild(box)
//         }

//         board.appendChild(row)
//     }
// }

// initBoard();
