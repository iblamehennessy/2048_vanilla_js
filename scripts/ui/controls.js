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
});