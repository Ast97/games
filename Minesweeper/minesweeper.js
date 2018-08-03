var result=document.querySelector("#result");
var gameOver=false;
var x;
var numBombs=0;

create2DArray();

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.element = "&nbsp;";
  this.bomb = false;
  this.revealed = false;
}

function create2DArray(){
    x = new Array(10);
    for (var i = 0; i < 10; i++)
        x[i] = new Array(10);
    for(var i=0;i<10;i++)
        for(var j=0; j<10; j++)
            x[i][j]=new Cell(i,j);

    createBoard(x);
}

function createBoard(){
    bombs();
    for(var i=0;i<10;i++)
        for(var j=0; j<10; j++){
            countBombs(i,j);
            if(x[i][j].bomb)
                ++numBombs;
            $(".gameBoard").append("<div class='cell'><span class='cellElement'>"+x[i][j].element+"</span></div>");
        }
}
var cells=document.querySelectorAll(".cell");

function bombs(){
    for(var i=0;i<15;i++){
        var p=Math.floor(Math.random()*10);
        var q=Math.floor(Math.random()*10);
        x[p][q].element='<i class="fa fa-bomb" aria-hidden="true"></i>';
        x[p][q].bomb=true;
    }
}

function countBombs(i,j){
    var c=0;
    if(x[i][j].bomb){
        return;
    }
    var p=i-1;var q=i+1;var r=j-1;var s=j+1;
    
    if(!(i==0 || i==9 || j==0 ||j==9))
        counts(p,q,r,s,i,j);
    else if(i==0 && j!=0 && j!=9){
        p=i;
        counts(p,q,r,s,i,j);
    }
    else if(i==9 && j!=0 && j!=9){
        q=i;
        counts(p,q,r,s,i,j);
    }
    else if(j==0 && i!=0 && i!=9){
        r=j;
        counts(p,q,r,s,i,j);
    }
    else if(j==9 && i!=0 && i!=9){
        s=j;
        counts(p,q,r,s,i,j);
    }
    else if(i==0 && j==0){
        p=i;r=j;
        counts(p,q,r,s,i,j);
    }
    else if(i==9 && j==0){
        q=i;r=j;
        counts(p,q,r,s,i,j);
    }
    else if(i==0 && j==9){
        p=i;s=j;
        counts(p,q,r,s,i,j);
    }
    else if(i==9 && j==9){
        q=i;s=j;
        counts(p,q,r,s,i,j);
    }

}

function counts(p,q,r,s,i,j){
    var c=0;
    for(var a=p;a<=q;a++){
        for(var b=r;b<=s;b++){
            if(!(a==i & b==j)){
                if(x[a][b].bomb)
                    c=c+1;
            }
        }
    }  
    if(c!=0)
        x[i][j].element=c.toString();
}

function adjacent(k){
    var i=parseInt(k/10);
    var j=parseInt(k%10);
    if(x[i][j].bomb){
        gameOver=true;
        return;
    }
    if(x[i][j].element=="&nbsp;"){
        floodFill(i,j);
        return;
    }
    else
        revealCell(k);
}

$(".cell").on("click",function(){
    if(!gameOver){
    this.firstChild.style.visibility = "visible"; 
    this.style.backgroundColor="whitesmoke";
    var k=$('.cell').index(this);
    adjacent(k);
    x[parseInt(k/10)][parseInt(k%10)].revealed=true;
        if(Win()){
            result.textContent="Congratulations! You Win :)";
            showAll();
            return;
        }
     if(gameOver && !Win()){
            result.textContent="Game Over! You Lose :(";
            showAll();
            return;
    }  
}
});


function showAll(){
    gameOver=true;
    $(".cellElement").css('visibility', 'visible');
}

function floodFill(i,j){
    for(var a=i-1;a<=i+1;a++){
        for(var b=j-1;b<=j+1;b++){
            if((a<0) || (a>9) || (b>9) || (b<0))
                return;
            if(!(a==i & b==j)){
                var num=(a*10)+(b%10);
            for(var k=0;k<cells.length;k++){
                if(k==num){
                    if(!(x[a][b].bomb) && !(x[a][b].revealed)){
                        revealCell(k);
                    }
                }
            }
        }  
    }
}
    if (x[i][j].element == "&nbsp;" && !(x[i][j].revealed)) {
        floodFill(i - 1, j);
        floodFill(i + 1, j);
        floodFill(i, j - 1);
        floodFill(i, j + 1);
    }
    else
        return;
}

function revealCell(k){
    cells[k].firstChild.style.visibility='visible';
    cells[k].style.backgroundColor="Gainsboro";
    x[parseInt(k/10)][parseInt(k%10)].revealed=true;
}

function Win(){
    var c=0;

    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            if(!(x[i][j].revealed))
                ++c;
        }
    }
    if(c==numBombs){
        gameOver=true;
        return true;
    }
    else return false;
}