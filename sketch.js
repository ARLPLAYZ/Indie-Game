let bgImg, leftI, rightI, topI, bottomI, wpn1Img, wpn2Img, playButton, playButtonS;
let player, mountain;
let bullet;
let ob, weapon, wpnAnim;
let lvl1;
let enemies = [];
let bullets = [];
let coolDown = Date.now();
let score, state=0;

function preload() {
    bgImg = loadImage('./images/lv2.png');
    leftI = loadImage('./images/left.png');
    rightI = loadImage('./images/right.png');
    topI = loadImage('./images/top.png');
    bottomI = loadImage('./images/bottom.png');
    wpnAnim = loadAnimation('images/shiru2.png', 'images/shiru3.png');
    lvl1 = loadImage('images/lvl1.png');
    playButton = loadImage('images/play.png');
    wpnAnim.frameDelay = 2;


}

function setup() {
    createCanvas(windowWidth, windowHeight);
    playButtonS = createSprite(width/2, height/2, 50, 50);
    playButtonS.visible = false;
    player = createPlayer();
    player.addImage('r', rightI);
    player.addImage('l', leftI);
    player.addImage('t', topI);
    player.addImage('b', bottomI);
    player.setCollider('circle', 0, 0, 250)
    mountain = createSprite(windowWidth / 2, windowHeight - 10, 10, 10);
    score = 0;
     



}

function draw() {
    background(lvl1);


    if (state === 0) {
        playButtonS.visible = true;
        playButtonS.addImage('a', playButton);
        playButtonS.scale = 0.2;
        textSize(30);
        fill('#2a9400')
        text('click me to play 🥺', playButtonS.x - 100, playButtonS.y + 100);
    } else if (state === 1) {
        playButtonS.visible = false;
        controls(player);
        checkIfOutsideBorder();
        textSize(20);
        fill('#FF0000')
        text('Score: ' + score, 20, 20);
        if (!enemies.length) {
            enemySpawn();
        }
        //console.log(bullets.length);

        for (const enemy of enemies) {
            enemy.friction = 0.5;
            enemy.attractionPoint(1.5, player.position.x, player.position.y);
            if (bullets.length) {
                for (const bullet of bullets) {
                    if (bullet.isTouching(enemy)) {
                        deleteBullet(bullets, bullet);
                        deleteBullet(enemies, enemy);
                        score += 1;
                    }
                }
            }
            if (enemy.isTouching(player)) {
                player.destroy();
                enemies.forEach(e => {
                    e.destroy()
                });
                //swal("Restart?", { button: 'YEA', });
                state = 2;
                playButtonS.visible = false;                
                swal({
                    title: 'Game Over! Score: ' + score,
                    text: 'Restart?',
                    button: 'Restart?',
                    icon: 'warning'
                }, function () {
                    location.reload()
                }) //.then((value) => { swal(`The returned value is: ${value}`); });
            }
        }
    }
    drawSprites();

}

function keyPressed() {
    if (keyCode === 37) {
        player.changeImage('l');

    }
    if (keyCode === 39) {
        player.changeImage('r');

    }
    if (keyCode === 38) {
        player.changeImage('t');

    }
    if (keyCode === 40) {
        player.changeImage('b');
    }
}

function deleteBullet(array, bullet) {
    const indexOf = array.find(e => e === bullet);
    if (!indexOf) return;
    const index = array.indexOf(indexOf);
    array.splice(index, 1);
    bullet.destroy();
};

function mouseClicked() {
    if (!playButtonS) return;
    console.log(dist(mouseX, mouseY, playButtonS.position.x, playButtonS.position.y));
    if (dist(mouseX, mouseY, playButtonS.position.x, playButtonS.position.y) <= 50) {
        console.log('e');
        state = 1;
    }
}
