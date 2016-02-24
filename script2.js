console.clear();

var player1sTurn = true;
var isGameOver = false;
var turns = 0;

function ready(){
  console.log('ready');
  console.log($('.square').length + " elements found");
  $('#button1').on('click',resetGame);
  $('.square').on('click',playTurn);

function playTurn(){
  //is the game over then no more turns allowed
  console.log('i= ' + $(this).attr('id'));
  if ( isGameOver ) {return};

  console.log("playTurn at " + $(this).attr('id'));  

  if (($(this).attr('class') === "square playerX") || ($(this).attr('class') === "square playerO")) {
    console.log("Square already played");
    alert("Square already played! Try another square");
    return;
  }
  
  if ( player1sTurn=== true ) {
    $(this).addClass("playerX");
    $(this).html("X");
    player1sTurn = false;
    turns ++;
    $("#turn").html("It is Player O's Turn");
    } 

  else {
    $(this).addClass("playerO");
    $(this).html("O");
    player1sTurn = true;
    turns ++;
    $("#turn").html("It is Player X's Turn");
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
  if ( $('.square')[a].className ==="square playerX" && ( $('.square')[a].className === $('.square')[b].className ) && ( $('.square')[a].className === $('.square')[c].className ) ){
    return "X";} 

  else if ($('.square')[a].className ==="square playerO" && ( $('.square')[a].className === $('.square')[b].className ) && ( $('.square')[a].className === $('.square')[c].className )){
  return "O";}
  
  else {return 0;}
}

function resetGame(){
    $('.square').removeClass("playerX");
    $('.square').removeClass("playerO");
    $('.square').html("");
    player1sTurn = true;
    isGameOver = false;
    turns = 0;  
  console.log("board cleared");
}
}

window.addEventListener('load', ready, false);
