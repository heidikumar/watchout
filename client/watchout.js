//Initialize gameboard
var gameBoard = {
  boardWidth: 900,
  boardHeight: 900,
  enemyWidth: 25,
  enemyHeight: 25,
  playerHeight: 50, 
  playerWidth: 50,
  enemyNum: 25,
  transitionDuration: 700,
  transitionDelay: 35,
  boardPadding: 30,
  asteroidLength: function(){ return this.boardWidth *0.25}
};

//Draw gameboard
var svg = d3.select('.container').append("svg:svg")
  .attr("width", gameBoard.boardWidth)
  .attr("height", gameBoard.boardHeight)
.append("g");

//Handle dragging AND gameboard boundaries on drag

/* Dragging implementation references:

1) http://jsfiddle.net/mdml/da37B/
2) http://stackoverflow.com/questions/19911514/how-can-i-click-to-add-or-drag-in-d3
*/

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
   var gameBoardMaxX = gameBoard.boardHeight;
   var gameBoardMaxY = gameBoard.boardWidth;
   var gameBoardMinX = 0;
   var gameBoardMinY = 0;

 if (x > gameBoardMaxX - (gameBoard.boardPadding - 5)){
  d3.select(this).attr("x", gameBoardMaxX - gameBoard.boardPadding);
 } else if (x < gameBoardMinX) {
  d3.select(this).attr("x", gameBoardMinX);
 } else {
  d3.select(this).attr("x", x);
 }
 if (y > gameBoardMaxY - (gameBoard.boardPadding - 5)){
  d3.select(this).attr("y", gameBoardMaxY - gameBoard.boardPadding);
 } else if (y < gameBoardMinY){
  d3.select(this).attr("y", gameBoardMinY);
 } else {
  d3.select(this).attr("y", y);
 }
}

//Draw enemies
var enemy = svg.selectAll("image")
.data(drawEnemies(gameBoard.enemyNum))
.enter()
.append("image")
.attr("xlink:href", "./shuriken.png")
.attr("class", "enemy")
.attr("height", gameBoard.enemyHeight + "px")
.attr("width", gameBoard.enemyWidth + "px")
.attr("x", function(d){ return d.x;})
.attr("y", function(d){ return d.y; })

//Make current player
var Player = svg.selectAll("image").select("g")
.data([1])
.enter()
.append("image")
.attr("xlink:href", "./leonardo.png")
.attr("height", gameBoard.playerHeight + "px")
.attr("width", gameBoard.playerWidth + "px")

.attr("x", Math.random()*gameBoard.boardWidth)
.attr("y", Math.random()*gameBoard.boardHeight)
.attr("class", "player")
.call(drag)

Player.on("click", function() {
  if (d3.event.defaultPrevented) return; // click suppressed
  console.log("click!");
});

function drawEnemies(n){
  var output = [];
  for (var i = 0; i < n; i++){
    output.push({id: i, x: Math.random()*gameBoard.boardWidth, y: Math.random()*gameBoard.boardHeight})
  }
  return output;
}

//Enemies move to a random location every 1 second
function moveEnemies(){
  //What's an enemy's position?
  var enemyPositionX = [];
  var enemyPositionY = [];
  svg.selectAll(".enemy")
    .transition()
    .duration(gameBoard.transitionDuration)
    .delay(gameBoard.transitionDelay)
    .attr("x", function(d){ var xPosition = d.x + Math.random()*gameBoard.asteroidLength(); enemyPositionX.push(xPosition); return xPosition;})
    .attr("y", function(d){ var yPosition = d.y + Math.random()*gameBoard.asteroidLength(); enemyPositionY.push(yPosition); return yPosition;})
    .tween("ourtween", function(){
      var fired = false; //stored in closure so it can only fire once 
      return function(t){
        //d3.select(this).interpolateString("rotate(-60, 150, 130)", "rotate(60, 150, 130)")   //WORKING ON A WAY TO ROTATE IMAGES WITHIN THE TWEEN
        var playerPos = d3.select(".player");
        var playerX = playerPos.attr("x");
        var playerY = playerPos.attr("y");
        //console.log("new enemy pos:" + d3.select(this).attr("x") + "," + d3.select(this).attr("y"));
        var enemyx = d3.select(this).attr("x");
        var enemyy = d3.select(this).attr("y");
          //try putting whole collision back in function to use has
          var distance = Math.sqrt(Math.pow((enemyx - playerX),2) + Math.pow((enemyy - playerY),2));
          var radius = gameBoard.enemyWidth/2  + gameBoard.playerWidth/2 ;

          if(distance<2*radius && !fired){
            //then we have a collision
            fired = true;
            console.log("Booms");
            UpdateCollsion();
            UpdateHighScore();
            UpdateScore();
            //Subtract points
          }   
        }
    })
    //what's the player's position?
    var playerPos = d3.select(".player")
    var playerX = playerPos.attr("x");//soemthifdlafjklds
    var playerY = playerPos.attr("y");//llalala

  //Calculate distance from player  
  for (var i = 0; i < enemyPositionX.length; i++){
    var distance = Math.sqrt(Math.pow((enemyPositionX[i] - playerX),2) + Math.pow((enemyPositionY[i] - playerY),2));
    var radius = gameBoard.enemyWidth/2  + gameBoard.playerWidth/2 ;

    if(distance<2*radius){
      //then we have a collision
      console.log("BOOM!");
      UpdateCollsion();
      UpdateHighScore();
      UpdateScore();
      //Subtract points
    }   
  }
}

//Move enemies, detect static collisions
var drawRefInterval = setInterval(moveEnemies, 1000);


//Start updating the score
setInterval(function(){d3.select(".current span").text((Number(d3.select(".current span").text())+1))}, 50);

function UpdateScore(){
  d3.select(".current span").text(0)
}

function UpdateHighScore(){
  var currentScore = Number(d3.select(".current span").text());
  if (currentScore > Number(d3.select(".high span").text())){
    d3.select(".high span").text(currentScore);
  }
}

function UpdateCollsion(){
  d3.select(".collisions span").text((Number(d3.select(".collisions span").text())+1));
}

//Wish list:

//1) Collision during transition [x]
//2) Board "boundaries" [x]
//3) Extra: Rotate the spaceship w/ mouse drag
//4) Random position for spaceship start [x]
//5) Levels [change gameBoard parameters]
//6) Player-specified enemy count [reset button]
// Advanced: 
//7) Visual cue on player instantiation
//8) Pause button: setInterval(moveEnemies, 1000); vs window.clearInterval()


