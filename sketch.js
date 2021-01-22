//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,bomb,fruitGroup,enemyGroup, score,r,randomFruit, position;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, bombImage, gameOverImage
var gameOverSound ,knifeSwoosh

function preload(){
  
  swordImage = loadImage("knife.png");
 bombImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}

function setup() {
  createCanvas(600, 600);


   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7

  sword.setCollider("rectangle",0,0,40,40);

 
  score=0
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  knifeSwooshSound.play()
  
  if(gameState===PLAY){
    
    
    fruits();
    Enemy();
   
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
  text("Score : "+ score,300,30);
}

function Enemy(){
  if(World.frameCount%200===0){
    bomb=createSprite(400,200,20,20);
    bomb.addAnimation("moving", bombImage);
    bomb.y=Math.round(random(100,300));
    bomb.velocityX=-(8+(score/10));
    bomb.setLifetime=50;
    
    enemyGroup.add(bomb);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruit.velocityX= (7+(score/4));
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}