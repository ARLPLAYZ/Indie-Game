
let bgImg, leftI, rightI, topI, bottomI, wpn1Img, wpn2Img;
let player, mountain;
let bullet;
let ob, weapon, wpnAnim;
let lvl1;
let enemies = [];
let bullets = [];
let coolDown = Date.now();
let urMeaslyScore;
function preload() {
    bgImg = loadImage('./images/lv2.png');
    leftI = loadImage('./images/left.png');
    rightI = loadImage('./images/right.png');
    topI = loadImage('./images/top.png');
    bottomI = loadImage('./images/bottom.png');
    wpnAnim = loadAnimation('images/shiru2.png', 'images/shiru3.png');
    lvl1 = loadImage('images/lvl1.png');
    wpnAnim.frameDelay = 2;


}
function setup() {
    createCanvas(windowWidth-300, windowHeight-100);
    
    player = createPlayer();
    player.addImage('r', rightI);
    player.addImage('l', leftI);
    player.addImage('t', topI);
    player.addImage('b', bottomI);
    player.debug = true;
    mountain = createSprite(windowWidth / 2 , windowHeight -10,10,10);
    urMeaslyScore = 0;

    


}
function draw() {
    background(lvl1);  
    controls(player);
    checkIfOutsideBorder(); 

    if (!enemies.length)  {
        console.log('breh');
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

                    }
                    
                }


            }
            if (enemy.isTouching(player)) {
                player.destroy();
                enemies.forEach(e=>{e.destroy()});
                //swal("Restart?", { button: 'YEA', });
                swal({
                    title: 'Restart?',
                    text: 'Restart?'
                }, function() {
                    console.log('aa');
                })//.then((value) => { swal(`The returned value is: ${value}`); });
            }
        /*for (var num=0 ; num < enemies.length ;num++) { 
            if(enemies[num].isTouching(player)) {
                swal({
                    icon: 'Game Over',
                    title: 'Well, you have failed',
                    text: 'The red ragers were too good for you!',
                })
            }*/
            
        }
        /*for (const e of enemies) {
            const eGroup = new Group();
            const bGroup = new Group();
            eGroup.add(e);
            
            for (const b of bullets) {
                bGroup.add(b);
                if (bGroup.collide(eGroup)) {
                    bGroup.destroyEach();
                }
            }            
        }*/
    /*
    e.friction = 0.5;
    e.attractionPoint(2, player.position.x, player.position.y);
    */   
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
    const indexOf = array.find(e =>e === bullet);
    if (!indexOf) return;
    const index = array.indexOf(indexOf);
    array.splice(index, 1);
    bullet.destroy();
    console.log('len', array.length, 'index', indexOf)
};

