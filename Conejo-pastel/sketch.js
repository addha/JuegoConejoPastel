const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var estadodeljuego = "play" ;
var conteop;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3; 

var bg_img;
var food;
var bunny;
var bunnyImg;
var mute_btn;

var vida1;
var vida2;
var vida3;

var fr;


var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;
var vidasbandera=0;
var gameover;
var caidaPastel =0;
var ganador,mensajeganar;

  //nuevos elementos
  var rope4 ,rope5 ,rope6,fruit2,fruit_con_4,fruit_con_5 ,fruit_con_6 ;

function preload()
{
  bg_img = loadImage('fondo.png');
  food = loadImage('pastel.png');
  bunnyImg = loadImage('Bunny_eating.png');
  eating = loadImage('Bunny_eating.png');
  vida1Img = loadImage ('pastel.png');
 

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav");
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  ganador = loadImage('ganador.jpg');
  gameover = loadImage('game.png');

  
}

function setup() 
{
  
 var isMobile = /iphone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile){
  canW =  displayWhidth;
  canH =  displayHeight; 
  createCanvas(displayWhidth+80, displayHeight);
}

else{
  canW =  windowWidth; 
  canH =  windowHeight;
  createCanvas(windowWidth, windowHeight);
}


 // createCanvas(500,700);
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   //btn3
   button3 = createImg('cut_btn.png');
   button3.position(360,200);
   button3.size(60,60);
   button3.mouseClicked(drop3);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50); 
  mute_btn.mouseClicked(mute);



  ground = new Ground(200,canH,600,20);


  bunny = createSprite(100,canH-200,100,100);
  bunny.addImage(bunnyImg)
  bunny.scale = 0.3;
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
 
  creacionCuerdas();
      unionFrutaObjeto();

  

}

function draw() 
{
 
    // image(bg_img,0,0, windowWidth+80, windowHeight);
     
    background("pink");
   image(bg_img,0,0, windowWidth+80, windowHeight);
    Engine.update(engine);

     if (estadodeljuego ==="play" ){
    
      push();
        imageMode(CENTER);
     if(fruit!=null){
      image(food,fruit.position.x,fruit.position.y,70,70);
     }
     pop();
 
  
  //Mostrar objetos_______________
  ground.show();
  rope.show();
  rope2.show();
  rope3.show(); 
  drawSprites();
 
  colisionObjetos();

  // evaluacion de colision  para activar vidas
  if(vidasbandera === 2){
    console.log("vidas total: "+  vidasbandera);
    vida2 = createImg('pastel.png');
    vida2.position(450,canH-300);         
    vida2.size(50,50); 
  }
  if(vidasbandera === 3){
    vida3 = createImg('pastel.png');
    vida3.position(450,canH-250);         
    vida3.size(50,50); 
    console.log("vidas total: "+  vidasbandera);
    estadodeljuego ="ganador";
    console.log("game state : "+  estadodeljuego);
  }
   // evalua game estate   y  vidas
   if (  estadodeljuego  ==="ganador" && vidasbandera === 3 ){
        mensajeganar = createSprite(200,200, 700, 900); // cambiar por ganaste
        mensajeganar.addImage(ganador)
        mensajeganar.scale=0.8;
         button.visible=false;
         button2.visible=false;
         button3.visible=false;
           
    }

    if(fruit!=null && fruit.position.y>=650)
  {
    bk_song.stop();
    sad_sound.play();
    fruit=null;
    var fin = createSprite(200,200, 200, 200); // cambiar por ganaste
    fin.addImage(gameover)
    fin.scale=0.6;
    //fin.visible=true;
    button.visible=false;
    button2.visible=false;
     button3.visible=false; 
   }


  
  }//fin de evaluacion play
}  //llave ddraw


function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}

function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}
function funcionNuevojuego(){
 creacionCuerdas();
 unionFrutaObjeto();
  push();
   imageMode(CENTER);
     if(fruit!=null){
         image(fruit2,fruit2.position.x,fruit2.position.y,70,70);
       }
   pop();

}
function  unionFrutaObjeto()
{
  
  console.log("fruta y unions");
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);  
}
function creacionCuerdas(){
  console.log("creaaion de cuerdas");
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  rope.show();
  rope2.show();
  rope3.show(); 

}


function funcionReinicio(){  //__________________________au no se ocupa
  vidasbandera=0;
  gamestate="inicio";
  console.log("reiniciando" +vidas+"vidas");
}


function colisionObjetos(){
 //// verifica colision objetos________________________________________

 if(collide(fruit,bunny)==true)
 {
  vidasbandera =vidasbandera+ 1;
  console.log("vidasbandera" +vidasbandera);
              //creo vida boton 1________________________________________________________________
               vida1 = createImg('pastel.png');
               vida1.position(450,canH-350);         
               vida1.size(50,50); 
               vida1.mouseClicked(funcionNuevojuego);

  } 
   
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}