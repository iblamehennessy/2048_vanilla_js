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
    const gameOver = document.getElementById('gameOver');
    const gameResult= document.getElementById('gameResult');
    const finalScore= document.getElementById("finalScore");
    if(board.flat().includes(2048)){
        gameResult.textContent = "You Won!";
        gameResult.style.color = "#edc22e";
        finalScore.textContent= score;
        gameOver.classList.add('visible');
    } 
    else if(!canMove()){
        gameResult.textContent = "Game Over!";
        gameResult.style.color = "#f65e3b";
        finalScore.textContent= score;
        gameOver.classList.add('visible');    
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
    document.getElementById('gameOver').classList.remove('visible');
}
function start(){
    spawnTile();
    spawnTile();
    updateBoard();
}