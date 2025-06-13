function canMove() {
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            if(board[r][c] === 0) return true;
            if(c< 3 && board[r][c] === board[r][c+1]) return true;
            if(r< 3 && board[r][c] === board[r+1][c]) return true;
        }
    }
    return false
}
function checkGameStatus() {
    if(board.flat().includes(2048)){
        alert("You Won!");
    } 
    else if(!canMove()){
        alert("You Lost! Try Again?")
    }
}
function reset(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    score = 0;
    spawnTile();
    spawnTile();
    updateBoard();
}
function start(){
    spawnTile();
    spawnTile();
    updateBoard();
}
start()