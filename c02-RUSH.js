//breakout close (core mechanics)
//mouse to control the paddle, click to start
let gameState = 'title';

var paddle, ball, wallTop, wallBottom, wallLeft, wallRight;
var ball2
var MAX_SPEED = 4;
var WALL_THICKNESS = 300;
var BRICK_W = 0;
var BRICK_H = 0;
var BRICK_MARGIN = 10;
var ROWS = 1;
var COLUMNS = 2;
var SCORE;
let bg;
let y = 0;
let skull;
let first;
let player;
let enemy0;
let enemy00;
var GRAVITY = 0.2;


function preload(){
skull = loadImage('assets/GameOver.png');
first = loadImage('assets/title.png');
player = loadImage('assets/Motor1.png');
enemy0 = loadImage('assets/enemy1.png');
enemy00 = loadImage('assets/enemy2.png')

 }
function setup() {
bg = loadImage('assets/RoadBackground.png');
  createCanvas(800, 600);
frameRate(60);


  paddle = createSprite(width/3, height-70, 11);
  paddle.addImage(player);
  paddle.scale=.080;
  paddle.immovable = true;

  wallTop = createSprite(width/2, -WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallTop.immovable = true;

  wallBottom = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallBottom.immovable = true;

  wallLeft = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallLeft.immovable = true;

  wallRight = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallRight.immovable = true;

  bricks = new Group();

  var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  var offsetY = 80;

  for(var r = 0; r<ROWS; r++)
    for(var c = 0; c<COLUMNS; c++) {
      var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      brick.shapeColor = color(150);
      bricks.add(brick);
      brick.immovable = true;
    }

  ball = createSprite(width/4, height-200, 11, 11);
  ball.addImage(enemy0);
  ball.velocity.y = -3;



SCORE = 0

}

function draw() {
  switch (gameState) {
  /* Each 'screen' that you want should be defined with a word,
  this word will correspond to a 'case' as seen below. The case
  will be followed by all of functions you want within that screen
  and end with a 'break;'. */
  case 'title':
    titleScreen();
    break;
  case 'lvl1':
    gameStage1();
    break;
  case 'gameover':
    gameOver();
    break;

}

}

function keyReleased() {
  if (gameState === 'title' || gameState === 'gameover') {
    if (key === 's' || key === 'S' ) {
      gameState = 'lvl1';
      bgR = 100;
      bgG = 240;
      bgB = 100;
    }
  } else if (gameState === 'lvl1') {
    if (key === 's' || key === 'S' ) {
      bgR = random(255);
      bgG = random(255);
      bgB = random(255);
    }
  }
}
function titleScreen () {
background(first);
  //text('press "s" to begin',width/2,height/5);
}
function gameStage1 () {
  background(bg);

    y++;
    if (y > height) {
      y = 0;
    }

// var scale = 3;
//     image(player,-400,-750);

  paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);

  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);

  if(ball.bounce(paddle))
  {
    var swing = (ball.position.x-paddle.position.x)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
        gameState = 'gameover';
        SCORE=0;
  }

  SCORE = SCORE + Math.round(getFrameRate()/60);
      console.log(frameCount);
      fill('aqua');
      textSize(30);
text('Score:  '+ SCORE,10,50);

  //ball.bounce(bricks, brickHit);
  drawSprites();
}

function gameOver () {
  background('black');
  stroke(255);
  fill(255);
  textSize(75);
  textAlign(CENTER);
  scale(0.5);
  image(skull,0,-750);
  textAlign(CENTER);
  textSize(50);
  text('Press "S" To Restart Game', width/1,height/.6);
}

function mousePressed() {

  if(ball.velocity.x == 0 && ball.velocity.y == 0) {
    ball.setSpeed(MAX_SPEED, random(90-10, 90+10));
  }



function brickHit(ball, brick) {
  brick.remove();
}

// function spawnEnemy0(){
//
//   if(frameCount%250===0){
//  var enemy0=createSprite(width/8, height-200, 101, 101);
//     ball.addImage(enemy1);
//     ball.scale=0.3;
//     ball.velocityY=4;
//     ball.x=Math.round(random(40,300));
//      ball.lifetime=300;
//
// }
}
