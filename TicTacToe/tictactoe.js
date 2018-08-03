var squares=document.querySelectorAll(".square");
var turnWin=document.querySelector("#turn");
var reset=document.querySelector("#reset");
var player="X";
var gameover=false;
var c=0;
reset.addEventListener("click",res);

ticTacToe();

function ticTacToe(){
	for(var i=0;i<squares.length;i++){
	squares[i].addEventListener("click",function(){
	if(!gameover && this.innerHTML=="<span>&nbsp;</span>"){
		this.textContent=player;
		if(player=="X" && ((squares[0].textContent=="X" && squares[1].textContent=="X" && squares[2].textContent=="X")||(squares[0].textContent=="X" && squares[3].textContent=="X" && squares[6].textContent=="X")||(squares[0].textContent=="X" && squares[4].textContent=="X" && squares[8].textContent=="X")||(squares[1].textContent=="X" && squares[4].textContent=="X" && squares[7].textContent=="X")||(squares[2].textContent=="X" && squares[4].textContent=="X" && squares[6].textContent=="X")||(squares[2].textContent=="X" && squares[5].textContent=="X" && squares[8].textContent=="X")||(squares[3].textContent=="X" && squares[4].textContent=="X" && squares[5].textContent=="X")||(squares[6].textContent=="X" && squares[7].textContent=="X" && squares[8].textContent=="X"))){
		turnWin.textContent="Player X Wins!";
		gameover=true;
	}
	else if(player=="O" && ((squares[0].textContent=="O" && squares[1].textContent=="O" && squares[2].textContent=="O")||(squares[0].textContent=="O" && squares[3].textContent=="O" && squares[6].textContent=="O")||(squares[0].textContent=="O" && squares[4].textContent=="O" && squares[8].textContent=="O")||(squares[1].textContent=="O" && squares[4].textContent=="O" && squares[7].textContent=="O")||(squares[2].textContent=="O" && squares[4].textContent=="O" && squares[6].textContent=="O")||(squares[2].textContent=="O" && squares[5].textContent=="O" && squares[8].textContent=="O")||(squares[3].textContent=="O" && squares[4].textContent=="O" && squares[5].textContent=="O")||(squares[6].textContent=="O" && squares[7].textContent=="O" && squares[8].textContent=="O"))){
		turnWin.textContent="Player O Wins!";
		gameover=true;
	}
	if(!gameover){
		player=="X"?player="O":player="X";
		turnWin.textContent="Player "+player;
	}
	}	
	draw();
	});
	}	
}

function draw(){
	c=0;
	for(var i=0;i<squares.length;i++){
		if(squares[i].textContent=="X" || squares[i].textContent=="O")
			c=c+1
	}
	if(c==9 && !gameover){
	turnWin.textContent="It's a Draw :(";
	player="X";
	gameover=true;
	}
}

function res(){
	for(var i=0;i<squares.length;i++){
		squares[i].innerHTML="<span>&nbsp;</span>";
	}
	turnWin.textContent="Player "+player;
	gameover=false;
	ticTacToe();
}	