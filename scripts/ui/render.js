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