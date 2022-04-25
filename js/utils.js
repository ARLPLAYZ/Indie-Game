function createPlayer() {
    const player = createSprite(windowWidth/2-800, windowHeight/2 + 200, 50, 50);
    player.scale = 0.2;
    return player;
}
function controls(player) {
    if (keyDown(37)) player.x = player.x -3;
    if (keyDown(38)) player.y = player.y -3;
    if (keyDown(39)) player.x = player.x + 3;
    if (keyDown(40)) player.y = player.y + 3;
    if (keyDown('space')) shootBullet();
}
function generateObstacle() {
    const obstacle = createSprite(random(windowWidth), random(windowHeight), random(100), random(300));
    return obstacle;
}

function checkIfOutsideBorder() {

    if (player.x <= 1) player.x = player.x + 20;
    if (player.x > windowWidth/2 + 500) player.x = player.x - 20;
    
    if (player.y <= 1) player.y = player.y + 20;
    if (player.y > windowHeight/2 + 270) player.y = player.y - 20;

}
function bulletCheck(sprite) {

    if (sprite.x <= 1) sprite.destroy();
    if (sprite.x > windowWidth/2 + 500) sprite.destroy();
    
    if (sprite.x <= 1) sprite.destroy();
    if (sprite.x > windowWidth/2 + 500) sprite.destroy();
}

function shootBullet() {
    if (Date.now() < coolDown) return;
    bullet = createSprite(150, windowWidth/2, 50, 20);
    bullet.addAnimation('e', wpnAnim);
    let facing = player.getAnimationLabel();    
    switch(facing) {
        case "r": bullet.velocityX = 5;
        bullet.x = player.x + 50;
        bullet.y = player.y;
        break;
        case "l": bullet.velocityX = -5;
        bullet.x = player.x -50;
        bullet.y = player.y;
        break;
        case "b": bullet.velocityY = 5;
        bullet.x = player.x;
        bullet.y = player.y + 50;
        break;
        case "t": bullet.velocityY = -5;
        bullet.x = player.x;
        bullet.y = player.y - 50;
        break;        
    }
    bullet.scale = 0.1;
    bullet.lifetime = 150;
    bullets.push(bullet);


    
    coolDown = Date.now() + 1e3/2;
    
    
}

function randomTrueFalse() {
    return [true,false][Math.round(Math.random(([true, false].length -1)))]
}
function sleep(ms) {
    return new Promise(res=> setTimeout(res(), ms))
}
function enemySpawn() {
    while (enemies.length < 5) {
        console.log('aa');
        const enemy = createSprite(random(windowWidth/2), random(windowHeight/2), 20, 20);
        enemy.addImage('b',loadImage('images/ugly.png'))
        enemy.scale = 0.07;
        enemy.friction = 0.5;
        enemy.attractionPoint(2, player.position.x, player.position.y)
        enemies.push(enemy);
        console.log(enemies.length);       
    }
    
    // const enemy = createSprite(random(windowWidth/2), random(windowHeight/2), 20, 20);
   /* let velocityY;
    velocityX ? velocityY = 0 : velocityY = 1;
    enemy.setVelocity(velocityX, velocityY);*/
       // return enemy;
}



