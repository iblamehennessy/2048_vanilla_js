const tileColors = {
  0: "#cdc1b4",
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e",
};
var score = 0;
function updateScore(){
    document.getElementById("score").textContent= `Score: ${score}`;
}
var board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
var prevBoard = JSON.parse(JSON.stringify(board));
function updateBoard(){
    const changes = [];
    
    for (var r = 0; r < 4; r++){
        for (var c = 0; c < 4; c++){
            const tileID = r*4+c;
            const tile = document.getElementById(`tile${tileID + 1}`);
            const value = board[r][c];
            const prevValue= prevBoard[r][c];
            if (tile) {
                tile.classList.remove('new-tile', 'merged-tile', 'moving-tile');

                tile.textContent = value === 0 ? "" : value;
                tile.style.backgroundColor = tileColors[value] || "#3c3a32";
                tile.className = "tile";
                if(value > 0) tile.classList.add(`number-${value}`);

                if(value !== 0 && prevValue === 0) {
                    tile.classList.add('new-tile')
                }
                else if(value!==prevValue && prevValue!==0){
                    tile.classList.add('merged-tile');
                    changes.push({tile, value})
                }
            }
        }
    }
    prevBoard = JSON.parse(JSON.stringify(board));
    updateScore();

    setTimeout(()=> {
        changes.forEach(change => {
            change.tile.classList.add('pulse');
            setTimeout(() => {
                change.tile.classList.remove('pulse');
            }, 300);
        });
    }, 50);
}
function spawnTile(){
    var empty =[];
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            if(board[r][c] === 0) empty.push([r, c]);
        }        
    }
    if(empty.length === 0) return;
    const [rIndex,cIndex] = empty[Math.floor(Math.random() * empty.length)];
    board[rIndex][cIndex] = Math.random() < .9 ? 2 : 4;
}
document.addEventListener("keydown", (e) => {
    if(["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        var moved = false;
        switch(e.key){
            case "ArrowLeft":
                moved = moveLeft();
                break;
            case "ArrowUp":
                moved = moveUp();
                break;
            case "ArrowDown":
                moved = moveDown();
                break;
            case "ArrowRight":
                moved = moveRight();
                break;
    }
    if(moved){
        spawnTile();
        updateBoard();
        checkGameStatus();
        }
    }
})
function moveRowLeft(row){
    var newRow =row.filter(val => val!== 0);
    for(var i = 0; i < newRow.length - 1;i++){
        if(newRow[i] === newRow[i+1]){
            newRow[i] *= 2;
            score += newRow[i];
            newRow[i + 1] = 0;
        }
    }
    newRow = newRow.filter(val => val !== 0);
    while(newRow.length < 4) newRow.push(0);
    return newRow;
}
function moveLeft(){
    var moved = false;
    for(var r = 0; r < 4; r++){
        const newRow = moveRowLeft(board[r]);
        if(newRow.toString() !== board[r].toString()){
            board[r] = newRow;
            moved = true;
        }
    }
    return moved;
}
function moveRight(){
    var moved = false;
    for(var r = 0; r < 4; r++){
       var row = [...board[r]].reverse();
       var newRow = moveRowLeft(row).reverse();
       if(newRow.toString() !== board[r].toString()){
        board[r] = newRow;
        moved=true
       }
    }
    return moved;
}
function transpose(matrix){
    return matrix[0].map((_, c) => matrix.map(row => row[c]));
}
function moveUp(){
    board = transpose(board);
    var moved = moveLeft();
    board = transpose(board);
    return moved;
}
function moveDown(){
    board = transpose(board);
    var moved = moveRight();
    board = transpose(board);
    return moved;
}