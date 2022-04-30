
let bgImg, leftI, rightI, topI, bottomI, wpn1Img, wpn2Img;
let player, mountain;
let bullet;
let ob, weapon, wpnAnim;
let lvl1;
let enemies = [];
let bullets = [];
let coolDown = Date.now();
let score;
let state = 0;
let magnit = 0;
var num="true";
let sound;
function preload() {
    bgImg = loadImage('./images/lv2.png');
    leftI = loadImage('./images/left.png');
    rightI = loadImage('./images/right.png');
    topI = loadImage('./images/top.png');
    bottomI = loadImage('./images/bottom.png');
    wpnAnim = loadAnimation('images/shiru2.png', 'images/shiru3.png');
    lvl1 = loadImage('images/lvl1.png');
    sound = loadSound('images/weeee.mp3');
    wpnAnim.frameDelay = 2;


}
function setup() {
    createCanvas(windowWidth, windowHeight);
    const playButton = createButton('mute');
    playButton.position(windowWidth-100, windowHeight-(windowHeight -40));
    playButton.class('button1');
    playButton.mousePressed(()=> {
        const e = document.getElementById('moosic');
        if (e.paused) e.play()
        else e.pause();
    });
    player = createPlayer();
    player.addImage('r', rightI);
    player.addImage('l', leftI);
    player.addImage('t', topI);
    player.addImage('b', bottomI);
    player.debug = true;
    player.setCollider('circle', 0, 0, 250);
    mountain = createSprite(windowWidth / 2 , windowHeight -10,10,10);
    score = 0;
}
function draw() {
    background(lvl1);  
    

    controls(player);
    checkIfOutsideBorder(); 
    textSize(20);
    fill('#FF0000');
    text('Score ' + score, 20, 20);
    if (!enemies.length)  {
        magnit = 0;
        enemySpawn();
    }
    if (magnit === 0) text('The Red Ragers are coming...',  windowWidth/2, windowHeight/2)
    if (state == 1) {
        text('Press space to restart', windowWidth/2, windowHeight/2);   
    }
    //console.log(bullets.length);

        for (const enemy of enemies) {            
            enemy.friction = 0.5;
            enemy.attractionPoint(magnit, player.position.x, player.position.y);
            if (bullets.length) {
                 for (const bullet of bullets) {
                    if (bullet.isTouching(enemy)) {
                        score+=1;
                        deleteBullet(bullets, bullet);
                        deleteBullet(enemies, enemy);

                    }
                    
                }


            }
            if (enemy.isTouching(player)) {
                player.destroy();
                enemies.forEach(e=>{e.destroy()});
                //swal("Restart?", { button: 'YEA', });
                state = 1;
                swal({
                    title: 'Restart?',
                    text: 'Restart?'
                }, function() {
                    location.reload();
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
    if (keyCode === 32 && state === 1)  location.reload();
}

function deleteBullet(array, bullet) {
    const indexOf = array.find(e =>e === bullet);
    if (!indexOf) return;
    const index = array.indexOf(indexOf);
    array.splice(index, 1);
    bullet.destroy();
};


function handlePauser() {
    if(num==="true"){ 
        document.getElementById('imageforsound').src='images/nosound.png'
        document.getElementById("moosic").play();
     
        num="false";
     
    } else if (num === 'false') {
        document.getElementById('imageforsound').src='images/sound.png'
        document.getElementById("moosic").pause();
        num = 'true';
    }
    
}
function music1() {
    const e = document.getElementById('moosic')
    e.volume = 0.2;
    e.play();
}

