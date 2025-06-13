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