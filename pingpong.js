const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');

let speed=10;
let tileCount=20; 
let tileSize=canvas.clientWidth/tileCount;
//pillar 1
let pillarX=tileCount - 1;
let pillarY=8;
//pillar 2
let pillar2X=0;
let pillar2Y=8;


//the movement of the ball
let xvelocity=1;
let yvelocity=1;

//drawing Ball
let BallX=10;
let BallY=10;

//scores
let player1Score=0
let Player2Score=0;

// game loop-to continously update screen
function drawGame(){
    changeBallPosition();
    clearScreen();
    drawPillar();
    drawBall();
    checkCollision()
    drawScore();
    setTimeout(drawGame, 1000/speed);//update screen x times a second
}
// score function
function drawScore(){
    //player 1 score
    ctx.fillStyle = "white";
    ctx.font = "20px verdena";
    ctx.fillText("Player 1: " + player1Score, canvas.clientWidth - 390, 20);
    //player 2 score
    ctx.fillStyle="white"
    ctx.font="20px verdena"
    ctx.fillText("Player 2: " + Player2Score, canvas.clientWidth-100,20);
}

// make screen black
function clearScreen(){
    
    ctx.fillStyle= 'black'
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)
    
}
function drawPillar(){
    ctx.fillStyle="orange";
    ctx.fillRect(pillarX* tileCount,pillarY* tileCount, tileSize,tileSize*5)
    ctx.fillStyle="orange";
    ctx.fillRect(pillar2X* tileCount,pillar2Y* tileCount, tileSize,tileSize*5)
    
}
function changeBallPosition(){
    BallX=BallX + xvelocity;
    BallY=BallY + yvelocity;
}
function drawBall(){
    // ctx.fillStyle= 'red'
    // ctx.fillRect(BallX*tileCount,BallY*tileCount,tileSize,tileSize) 
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc (BallX*tileCount, BallY*tileCount, tileSize-5, 0, 2*Math.PI);
    ctx.fill();   
}
// check for collision of ball and something about that
function checkCollision() {
    //height of pillar
    pillarHeight1 =[pillarY, pillarY +1, pillarY +2, pillarY+3, pillarY+4]
    pillarHeight2 =[pillar2Y, pillar2Y +1, pillar2Y +2, pillar2Y+3, pillar2Y+4]

    if (BallX == 0){
        BallX = 10
        BallY = 10
        Player2Score++
    }
    if (BallX == tileSize){
        BallX = 10
        BallY = 10
    player1Score++
}
if(Math.floor(BallY) == 0 || Math.floor(BallY) == tileSize -1){
    yvelocity = -yvelocity
}
if(BallX == pillar2X + 1 && pillarHeight2.includes(BallY)){
    xvelocity = -xvelocity
}
if(BallX == pillarX  && pillarHeight1.includes(BallY)){
    xvelocity = -xvelocity
}

}
document.body.addEventListener('keydown', keyDown);
function keyDown()
{
    //player 1  up
    if(event.keyCode==38){
        if(pillarY ==0)
        return
        pillarY--
    }
    // player 1 down
    if(event.keyCode==40){
        if(pillarY==tileCount-5)
        return
        pillarY++
    }
    //player 2  up
    if(event.keyCode==87){
        if(pillar2Y ==0)
        return
        pillar2Y--
    }
    // player 2 down
    if(event.keyCode==83){
        if(pillar2Y==tileCount-5)
        return
        pillar2Y++
    }
}
 drawGame(); 