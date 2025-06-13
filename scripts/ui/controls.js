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
function setupTouchControls() {
    var touchStartX = 0;
    var touchStartY = 0;
    var touchEndX = 0;
    var touchEndY = 0;
    document.addEventListener("touchStart", (e) => {
        touchStartX= e.changedTouches[0].screenX;
        touchStartY= e.changedTouches[0].screenY; 
    });
    document.addEventListener("touchEnd", (e) => {
        touchEndX= e.changedTouches[0].screenX;
        touchEndY= e.changedTouches[0].screenY; 

        handleSwipeGesture();
    });

function handleSwipeGesture(){
    const deltaX = touchEndX-touchStartX;
    const deltaY= touchEndY-touchStartY;
    if(Math.abs(deltaX)>Math.abs(deltaY)){ 
        if(deltaX >0){  //horizontal
            moveRight()
        }
        else{
            moveLeft()
        }
    } 
        else{
            if(deltaY >0){ //vertical
                moveDown()
        }
        else{
            moveUp()
        }
    }
}
}