var board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
function updateBoard(){
    for (var r = 0; r < 4; r++){
        for (var c = 0; c < 4; c++){
            const tileID = r*4+c;
            const tile = document.getElementById(`tile${tileID}`);
            const value = board[r][c];
            if (tile) tile.textContent = value === 0 ? "" : value;
        }
    }
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
    }
})
function moveRowLeft(row){
    row=row.filter(val => val!== 0);
    for(var i = 0; i < row.length - 1;i++){
        if(row[i] === row[i+1]){
            row[i] *= 2;
            row[i + 1] = 0;
        }
    }
    row = row.filter(val => val !== 0);
    while(row.length < 4) row.push(0);
    return row;
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
       var row = board[r].slice().reverse();
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
    let moved = moveLeft();
    board = transpose(board);
    return moved;
}
function moveDown(){
    board = transpose(board);
    let moved = moveRight();
    board = transpose(board);
    return moved;
}
function start(){
    spawnTile();
    spawnTile();
    updateBoard();
}
start()