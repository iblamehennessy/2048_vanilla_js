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
    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 20;
    let canSwipe= true;
    document.addEventListener("touchstart", (e) => {
        if(!canSwipe) return;
        touchStartX= e.touches[0].clientX;
        touchStartY= e.touches[0].clientY;
        e.preventDefault(); 
    }, {passive:false});

    document.getElementById("touchpad").addEventListener("touchmove", (e) =>{
        e.preventDefault();
    }, {passive:false})

    document.getElementById("touchpad").addEventListener("touchend", (e) => {
        if(!canSwipe) return;
        touchEndX= e.changedTouches[0].clientX;
        touchEndY= e.changedTouches[0].clientY; 

        const deltaX = touchEndX - touchStartX;
        const deltaY= touchEndY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if(Math.max(absDeltaX, absDeltaY)<minSwipeDistance) return;

        canSwipe=false;
        let moved=false;
        if(absDeltaX > absDeltaY) {
            moved= deltaX > 0 ? moveRight() : moveLeft();
        }
        else{
            moved= deltaY > 0 ? moveDown() : moveUp();
        }
        if(moved){
            spawnTile();
            updateBoard();
            checkGameStatus();
        }
        setTimeout(() => canSwipe = true, 200);
        e.preventDefault();
    }, {passive:false});

    }

// Existing touch event bindings in controls.js
document.addEventListener("touchstart", function (e) {
    // Ignore swipe handling if tapping UI buttons or overlays
    if (e.target.closest(".btn, #overlay")) return;
    handleTouchStart(e);
}, { passive: false });

document.addEventListener("touchend", function (e) {
    if (e.target.closest(".btn, #overlay")) return;
    handleTouchEnd(e);
}, { passive: false });
