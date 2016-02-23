console.clear();

var player1sTurn = true;
var isGameOver = false;
var turns = 0;
var elements = document.getElementsByClassName("square");

function ready(){
  console.log('ready');
  console.log(elements.length + " elements found");
  document.getElementById("button1").addEventListener('click',function(event){
    resetGame();
  },false);

  for ( var i = 0; i < elements.length; i++ ){
      addClickListener(elements[i], i);
  }
}

function addClickListener(element, i){
  element.addEventListener('click', function(event){
    console.log('i= ' + i);
    playTurn( element, i);
  }, false);
}

function playTurn(element, i){
  //is the game over then no more turns allowed
  if ( isGameOver ) return;
  console.log("playTurn at " + i);
  
  if ((element.className === "square playerX") || (element.className === "square playerO")) {
    console.log("Square already played");
    alert("Square already played! Try another square");
    return;
  }
  
  if ( player1sTurn=== true ) {
    element.className += " playerX";
    element.innerHTML = "X";
    player1sTurn = false;
    turns ++;
    document.getElementById("turn").innerHTML = "It is Player O's Turn";
    } 

    else {
    element.className += " playerO";
    element.innerHTML = "O";
    player1sTurn = true;
    turns ++;
    document.getElementById("turn").innerHTML = "It is Player X's Turn";
    }
  checkGameOver();
}

function checkGameOver(){
  console.log("checking if gameover");
  var winner = 0; 
  //check each possible line if no winner yet
  winner = checkLine(0,1,2);
  //check other lines e.g
  if ( winner === 0 ) winner = checkLine(3,4,5);
  if ( winner === 0 ) winner = checkLine(6,7,8);
  if ( winner === 0 ) winner = checkLine(0,3,6);
  if ( winner === 0 ) winner = checkLine(1,4,7);
  if ( winner === 0 ) winner = checkLine(2,5,8);
  if ( winner === 0 ) winner = checkLine(0,4,8);
  if ( winner === 0 ) winner = checkLine(6,4,2);   
  if ( winner !== 0 ){ 
    isGameOver = true;
    alert("Winner is player " + winner );
    resetGame();
  }
  if (turns>8) {
    alert("It's a tie!");
    resetGame();
  }
}

function checkLine(a,b,c){
  if ( elements[a].className ==="square playerX" && ( elements[a].className === elements[b].className ) && ( elements[a].className === elements[c].className ) ){
    return "X";} 

  else if (elements[a].className ==="square playerO" && ( elements[a].className === elements[b].className ) && ( elements[a].className === elements[c].className )){
  return "O";}
  
  else {return 0;}
}

function resetGame(){
  for ( var i = 0; i < elements.length; i++ ){
    elements[i].className = "square";
    elements[i].innerHTML = "";
    player1sTurn = true;
    isGameOver = false;
    turns = 0;
  }
  console.log("board cleared");
}

window.addEventListener('load', ready, false);
