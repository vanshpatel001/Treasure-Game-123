var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime = 0;
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacles, obstacleImage;
var FoodGroup, obstacleGroup,bananaGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 600);
  
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  //create banana and obstacle groups
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime:" + survivalTime,100,50);
  
}


function draw() {
   background("white");
  
  if(gameState===PLAY){
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 50) {
        monkey.velocityY = -12;
    }
     }
  
  if(gameState===END){
     
    ground.velocityX = 0;
    
    banana.velocityX = 0;
    
    
     }
   //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  food();
  obstacles();

   drawSprites();
}

function food(){
  
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,200,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each banana to the group
    bananasGroup.add(banana);
  }
}

function obstacles(){
  
  if (frameCount % 300 === 0){
    var obstacle = createSprite(600,310,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    
    //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //add each banana to the group
    obstaclesGroup.add(obstacle);
  }
}
