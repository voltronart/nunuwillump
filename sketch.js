var foxy,foxyimg;
var bordas;
var chao,chaolat; 
var chaofake
var nuvem,nuvemimg;
var cactus;
var pontos=0;
var cactusg; 
var nuvemg;
var  PLAY=1;
var OVER=2;
var gamestate=PLAY
var dead
var soundc
var soundd
var soundj
var reset,resetimg
var gameover,gameoverimg 
function preload(){
  // pre carrega os arquivos do jogo
 nuvemimg = loadImage('cloud.png');
  foxyimg = loadAnimation("trex3.png","trex4.png");
 chaolat = loadImage('ground2.png');
 cactus1 = loadImage('obstacle1.png');
 cactus2 = loadImage('obstacle2.png');
 cactus3 = loadImage('obstacle3.png');
 cactus4 = loadImage('obstacle4.png');
 cactus5 = loadImage('obstacle5.png');
 cactus6 = loadImage('obstacle6.png');
 dead   = loadImage('trex_collided.png');
 soundc = loadSound('checkPoint.mp3');
 soundd = loadSound('die.mp3');
 soundj = loadSound('jump.mp3');
 resetimg = loadImage('restart.png');
 gameoverimg = loadImage('gameOver.png');
}



function setup(){
  createCanvas(windowWidth,windowHeight);
 cactusg = new Group()
 nuvemg = new Group()
  var trest =Math.round(random(1,10));
 console.log(trest)
  //configurações do foxy
  foxy = createSprite(50,height-100,20,20);
  foxy.addAnimation("running",foxyimg);
  foxy.scale = 0.5;
  foxy.addImage('dead',dead);
  //foxy.debug=false
  //foxy.setCollider('circle',0,0,48);

 chao = createSprite(width/2,height-10,600,20);
 chao.addImage(chaolat);
 chao.x=chao.width/2;
  bordas = createEdgeSprites();

  chaofake = createSprite(width/2,height,width,10);
  chaofake.visible=false
  
  reset = createSprite(width/2,height/2+50,10,10);
 reset.addImage(resetimg);
 reset.visible=false

 gameover = createSprite(width/2,height/2,10,10)
 gameover.addImage(gameoverimg);
  gameover.visible=false


}

function draw(){
  background('white');
   fill('black');
   text('pontos: '+pontos,50,32);
  

   


 

  
 
   if(gamestate===PLAY){
     pontos=pontos+Math.round(frameRate()/60)
     // pulo do foxy
   if(touches.length>0&&foxy.y>=height-30){
     foxy.velocityY = -14 ;  
     soundj.play();
     touches=[];
    }
     // gravidade
     foxy.velocityY = foxy.velocityY + 1;
     // colisao com o chao
     foxy.collide(chaofake);
     chao.velocityX = -(5+pontos/100); 
     
     if(chao.x<0){
     chao.x=chao.width/2;
      
    }
     if(foxy.isTouching(cactusg)){
        gamestate=OVER;
       soundd.play();     
       //foxy.velocityY = -14 
       //soundj.play();  
      }
     cactos();
     gerarnuvem();

     if(pontos%100===0&&pontos>0){
       soundc.play();
     
      }
  
  
    }else if(gamestate===OVER){
    chao.velocityX=0
    cactusg.setVelocityXEach(0);
    nuvemg.setVelocityXEach(0);
    nuvemg.setLifetimeEach(-1);
   cactusg.setLifetimeEach(-1);
   foxy.changeAnimation('dead');
   foxy.velocityX=0
   foxy.velocityY=0  
   reset.visible=true
   gameover.visible=true
   if(touches.length>0){
     touches=[];
    resett();

   }
  } 
 
 


 
   // text(mouseX+","+mouseY,mouseX,mouseY);
  drawSprites();
}
function gerarnuvem(){
 
  if(frameCount%60===0){
    nuvem = createSprite(width+15,30,10,10);
    nuvem.velocityX=-3;
  
    nuvem.addImage(nuvemimg);
    nuvem.scale=0.6;
    nuvem.y= Math.round(random(height-190,height-100));
    nuvem.depth=foxy.depth;    
    foxy.depth=foxy.depth+1;
    nuvem.lifetime=width
    nuvemg.add(nuvem);
  } 

   
   
}
function cactos(){
if(frameCount%60===0){
  cactus = createSprite(width+10,height-25,10,10);
  cactus.velocityX=-(5+pontos/100);
  var rand = Math.round(random(1,6));
  switch(rand){
    case 1 :cactus.addImage(cactus1);
    break;
    case 2 :cactus.addImage(cactus2);
    break;
    case 3 :cactus.addImage(cactus3);
    break;
    case 4 :cactus.addImage(cactus4);
    break;
    case 5 :cactus.addImage(cactus5);
    break;
    case 6 :cactus.addImage(cactus6);
    break;
  }
  cactus.scale=0.5
 cactus.lifetime=width
 cactusg.add(cactus);

}



}
function resett(){
gamestate=PLAY
cactusg.destroyEach();
nuvemg.destroyEach();
foxy.changeAnimation('running');
pontos=0
gameover.visible=false;
reset.visible=false;
}