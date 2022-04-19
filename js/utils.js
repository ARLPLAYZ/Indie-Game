function createPlayer() {
    const player = createSprite(windowWidth/2-800, windowHeight/2 + 200, 50, 50);
    player.addImage(leftI);
    player.scale = 0.2;
    return player;
}
function controls(player) {
    if (keyDown(37)) player.addImage(leftI)
    else if (keyDown(39)) player.addImage(rightI)
    else if (keyDown(38)) player.addImage(topI)
    else if (keyDown(40)) player.addImage(bottomI);
}
