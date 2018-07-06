class Space_Invaders {
  constructor() {
    this.enemies = enemies;
    this.player = players;

  }

}
 var score=0;
class Ship{

  constructor(pic) {
    this.pic = pic;
    this.bullets= Array();
  }
  
    shoot(){
        var cont=40;
       docu.keydown(function(e){

           if (e.which==32) {



               var divbullet=$('<div id="'+cont+'"class="shoot"></div>');
               var bullet = new Bullet($('.spaceShip').position().top,$('.spaceShip').position().left,divbullet,cont);
                cont++;
              $('.space').append(divbullet);
              $('.shoot').hide();
               var shoot1 = new Audio('audio/laser-shoot.wav');
               shoot1.play();
              bullet.moveUp(bullet);



           }
  });
  }
  
    create(){
        var spaceShip=$('<div class="spaceShip"></div>');
        $('.space').append(spaceShip);
        var xenemies = new Array();
        $("#score").text( score);

        for (let i = 0; i < 6; i++) {
                var enemy =$('<div id="'+i+ '"class="enemy"></div>');
                var enemy1 =$('<div id="'+1+i+ '"class="enemy"></div>');
                var enemy2 =$('<div id="'+2+i+ '"class="enemy"></div>');
                $('.game').append(enemy);
                $('.game').append(enemy1);
                $('.game').append(enemy2);
                 var arrayenemy = new Enemy('img/enemy.gif',enemy,enemy.position().top+100,enemy.position().left+200+i*50);
                 var top_enemy = new Enemy('img/space_enemy.gif',enemy1,enemy.position().top+50,enemy.position().left+200+i*50);
                 var final_enemy = new Enemy('img/cat.gif',enemy2,enemy.position().top,enemy.position().left+200+i*50);
                      $("#"+1+i).css('background-image','url('+top_enemy.pic+')');
                      $("#"+2+i).css('background-image','url('+final_enemy.pic+')');
                    $("#"+i).css('background-image','url('+arrayenemy.pic+')');

                    xenemies.push(arrayenemy);
                    xenemies.push(top_enemy);
                    xenemies.push(final_enemy);
                        arrayenemy.behave(arrayenemy);
                        top_enemy.behave(top_enemy);
                        final_enemy.behave(final_enemy);
                 }
        var self = this;

        this.x = setInterval(function () {
             var divbul = $('<div class="shoot"></div>');
             $('.space').append(divbul);
             $('.shoot').hide();
             var items = Math.floor(Math.random() * xenemies.length)
            self.winner(this.x);
                if($('#' + items).is(":visible")) {

                    var bullet = new Bullet($('#' + items).position().top, $('#' + items).position().left, divbul);
                    bullet.enemy_shoot(bullet);

                }
                else if($('enemy').is(":visible") == false){

                    clearInterval(this.x);
                }
           },500);


        }

       winner(x){
            vis = $('.enemy').is(":visible")

            if ($('.enemy').is(":visible")==false){
                $('.space').hide();
                var divthopy=$('<div class="col-2"> <img style="  padding-top: 100%;margin-left: 100%;" src="img/thopy.gif" alt="thopy" width="100%"></div>');
                var divwinner=$('<div class="col-8" align="center"> <img src="img/you_Win.png" alt="winner" width="100%"> <br> <h4>Your Score:'+score+'</h4>  <button type="button" class="btn btn-primary btn-lg btn-inline" id ="play"style="">Try again</button></div>');
               $('.game').append(divthopy);
                $('.game').css('background-color','white');
                $('.game').append(divwinner);
                clearInterval(this.x);


            }
            else if($('.spaceShip').is(":visible")==false){

                $('.space').hide();

                var divloser=$('<div class="col-10" align="center " > <img style="  padding-top: 20%;"  src="img/youlose.gif" alt="thopy"><br> <h4 style="color:white;">Your Score:'+score+'</h4>  <button type="button" onclick="loading();" class="btn btn-primary btn-lg btn-inline" id ="try" style="">Try again</button></div>');
                $('.game').append(divloser);
                clearInterval(this.x);

            }
        
      
        } 
  
    move(){
    
      docu.keydown(function(e){
          
         var ship=$('.spaceShip'); 
         var left = parseInt(ship.css('left'));
         var top = parseInt(ship.css('top'));
         var speed = 150;
            if (e.which==37) {
                if(left-speed>=200)
              ship.css('left',(left-speed)+"px");
              else{
                  ship.css('left',(200)+"px");
                  
              }
             }
             else if(e.which==39){
                 if (left+speed <=900) {
                     ship.css('left',(left+speed)+"px");
                 } else {
                      ship.css('left',(900)+"px");
                 }
            
            
            }
        
        });
    
    
    }
  
}

class Bullet{
 
  constructor(top,left,id,num) {
      this.id=id;
      this.num=num;
    this.top=top;
    this.left=left;
    this.speed=3;

  }

    moveUp(self){
       if (self.top>0-this.speed) {

            self.top = self.top - this.speed;
            self.id.show();
            self.id.css('top', self.top);
            self.id.css('left', self.left);

           var hit= function(){
           jQuery.each($('.enemy'), function( i, val ) {
               var obj = $(val);



               if(overlap(self.id.get(0).getBoundingClientRect(),val.getBoundingClientRect())) {



                   if ($('.enemy').get(i).style.backgroundImage == 'url("img/enemy.gif")') {
                       score = 50 + score;
                       $("#score").text(score);
                       $('#'+self.num+'').remove();
                       var boom = new Audio('audio/explosion-collide58.wav');
                       boom.play();

                   }
                   else if ($('.enemy').get(i).style.backgroundImage == 'url("img/space_enemy.gif")') {
                       score = 100 + score;
                       $("#score").text(score);
                       console.log(score);
                       $('#'+self.num+'').remove();
                       var boom = new Audio('audio/kick01.flac');
                       boom.play();
                   }
                   else if ($('.enemy').get(i).style.backgroundImage == 'url("img/cat.gif")') {
                       score = 200 + score;
                       $("#score").text(score);
                       $('#'+self.num+'').remove();
                       var boom = new Audio('audio/catmeow.wav');
                       boom.play();
                   }
                   obj.css('background-image', 'url("img/explote.gif")');



                   setTimeout(function () {
                       obj.css('background-image', 'url("img/transparent.png")');
                       obj.hide();

                   }, 500);

               }

           })};

            setTimeout(function () {
                if(true){
                    hit();
                self.moveUp(self)}

            }, 1);

        }


        else{
            this.id.remove();
        }

    }
    enemy_shoot(self){
        if (self.top<=600){

            self.top=self.top+this.speed;
            self.id.show();
            self.id.css('background-color','green');
            self.id.css('top',self.top);
            self.id.css('left',self.left);
            var hit= function(){
                    var val =$('.spaceShip');
                    if(overlap(self.id.get(0).getBoundingClientRect(),$('.spaceShip').get(0).getBoundingClientRect())) {

                        val.css('background-image', 'url("img/explote.gif")');
                        self.id.remove();
                        var die = new Audio('audio/die.wav');
                        die.play();
                        setTimeout(function () {
                            val.css('background-image', 'url("img/transparent.png")');
                            val.remove();
                        }, 500);

                    }
                };

            setTimeout(function (){
                hit();
                self.enemy_shoot(self)
            },1) ;



        }else{
            this.id.remove();
        }


    }

  
}  

class Player extends Ship{
 
 
  constructor(name) {
    super();
    this.name=name;
    
  }
  
  
}

class Enemy extends Ship{
 
 
  constructor(pic,id,top,left) {
   super(pic);
    this.id=id;
    this.top=top;
    this.left=left;
    this.speed=2;
    this.speed_Down=-10;

  }


    behave(self){

       if(self.left>900){
            this.speed=(-1)*this.speed;
            self.left=self.left+this.speed;
            self.top=self.top-this.speed_Down;
            self.id.css('top',self.top);
            self.id.css('left',self.left);
            this.y=setTimeout(function (){self.behave(self)},100) ;



        }
        else if (self.left>=200){

            self.left=self.left+this.speed;
            self.id.css('top',self.top);
            self.id.css('left',self.left);
            this.y1=setTimeout(function (){self.behave(self)},100) ;
           checkwinner(this.y2);
           checkwinner(this.y1);
           checkwinner(this.y);

        }
        else if(self.left<200){
            this.speed=-this.speed;
            self.left=self.left+this.speed;
            self.top=self.top-this.speed_Down;
            self.id.css('top',self.top);
            self.id.css('left',self.left);
            this.y2=setTimeout(function (){self.behave(self)},100) ;

        }



    }
  
  
}
function overlap(rect1,rect2){

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);



}
function checkwinner(y){
    if($('.enemy').is(":visible") == false) {
        clearTimeout(y);

    }

}
function loading(){
    location.reload();

}

$(document).ready(function(){
    docu= $(document);
    $('.score').hide();
    vis =false;

    $('#play').click(function () {
         var audio = new Audio('audio/Space_Gone.mp3');
         audio.play();
         $('.menu').hide();
        $('.score').show();
         var player1= new Player('Esteban');
         player1.create();
        player1.move();
         player1.shoot();
        
    });
   




});


