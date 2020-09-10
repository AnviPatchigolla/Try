var monkey, monkey_anim;
var score;
var ground, ground_img;
var invGround;
var obstacle_img, ObstaclesGroup;
var banana_img, BananasGroup;

function preload() {

  monkey_anim = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
  ground_img = loadImage("jungleBackground.jfif");
  
  obstacle_img = loadImage("stone.png")
  
  banana_img = loadImage("banana.png");

}

function setup() {
  
  createCanvas(650, 400);
  
  ground = createSprite(width/2, height/2, 200, 200);
  ground.addImage(ground_img);
  ground.scale = 5;
  ground.velocityX = -3;
  
  monkey = createSprite(55,340, 20, 20);
  monkey.addAnimation("monkey", monkey_anim);
  monkey.scale = 0.1;
  
  invGround = createSprite(width/2, 360, width, 5);
  invGround.visible = false;
   
  ObstaclesGroup = new Group();
  BananasGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(220);
  
  spawnObstacles();
  spawnBananas();
  monkeyScale();
  
  monkey.collide(invGround);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y > 300){
    monkey.velocityY = -15;     
  }
  
  monkey.velocityY = monkey.velocityY + 0.6; 
  
  if(BananasGroup.isTouching(monkey)){
    BananasGroup.destroyEach();
    score = score + 2;
  }
  
  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(20);
  text("Score: " + score, 500,50);
  
}

function spawnObstacles(){
  if(World.frameCount%300 == 0){
    var obstacle = createSprite(width,320,20,20);
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3 ;
    obstacle.lifetime = -width/obstacle.velocityX;
    ObstaclesGroup.add(obstacle);
  }
}

function spawnBananas(){
  if(World.frameCount%100 == 0){
    var banana = createSprite(width,220,10,10);
    banana.velocityX = -3;
    banana.y = random(120,200);
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.lifetime = -width/banana.velocityX;
    BananasGroup.add(banana);
  }
}

function monkeyScale(){
  
  switch (score){
    case 10: monkey.scale = 0.12;
      break;
      
    case 20: monkey.scale = 0.14;
      break;
      
    case 30: monkey.scale = 0.16;
      break;
      
    case 40: monkey.scale = 0.18
      break;
      
    default: break;
  }
  
  if(ObstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.1;
    score = 0;
  }
}