var snake;
var scl=10;
var food;

function Snake(){
    this.x=0;
    this.y=0;
    this.xspeed=1;
    this.yspeed=0;

    this.direction=function(x,y){
        this.xspeed=x;
        this.yspeed=y;
    }

    this.update=function(){
        this.x=this.x+this.xspeed*scl;
        this.y=this.y+this.yspeed*scl;
        this.x=constrain(this.x,0,width-scl);
        this.y=constrain(this.y,0,height-scl);
    }

    this.show=function(){
        fill(255);
        rect(this.x,this.y,scl,scl);
    }

    this.eat=function(){
        if(dist(this.x,food.x,1,1)||dist(this.y,food.y,1,1))
         pickLocation();
    }

}

function setup(){
    createCanvas(500,500);
    snake=new Snake();
    frameRate(10);
    pickLocation();
}

function draw(){
    background(0);  
    snake.update();
    snake.show();
    fill(255,0,0);
    rect(food.x,food.y,scl,scl);
    snake.eat(food);
}

function keyPressed(){
    if(keyCode===UP_ARROW)
        snake.direction(0,-1);
    else if(keyCode===DOWN_ARROW)
        snake.direction(0,1);
    else if(keyCode===RIGHT_ARROW)
        snake.direction(1,0);
    else if(keyCode===LEFT_ARROW)
        snake.direction(-1,0);
}

function pickLocation(){
    var cols=floor(width/scl);
    var rows=floor(height/scl);
    food=createVector(floor(random(cols)),floor(random(rows)));
    food.mult(scl);
}