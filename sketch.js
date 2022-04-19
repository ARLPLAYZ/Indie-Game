
let bgImg, leftI, rightI, topI, bottomI;
function preload() {
    bgImg = loadImage('./images/2.png');
    m1Img = loadImage('./images/3-removebg-preview.png');
    m2Img = loadImage('./images/4-removebg-preview.png');    
    leftI = loadImage('./images/left.png');
    rightI = loadImage('./images/right.png');
    topI = loadImage('./images/top.png');
    bottomI = loadImage('./images/bottom.png');


}
function setup() {
    createCanvas(windowWidth-300, windowHeight-100);
    

    const mountain = createSprite(windowWidth / 2 , windowHeight -10,10,10)
}
function draw() {
    background('#42cef5');
    let mainGuy = createPlayer();
    controls(mainGuy);
    drawSprites();
}