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
var board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
var prevBoard = JSON.parse(JSON.stringify(board));
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
function updateScore(){
    document.getElementById("score").textContent= `Score: ${score}`;
}
