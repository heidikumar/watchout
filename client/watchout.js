// start slingin' some d3 here.

//Initialize gameboard
var gameBoard = {
  boardWidth: 900,
  boardHeight: 900,
  enemyWidth: 25,
  enemyHeight: 25,
  enemyNum: 25,
  transitionDuration: 700,
  transitionDelay: 45,
  asteroidLength: function(){ return this.boardWidth *0.25}
};

//Draw gameboard
var svg = d3.select('.container').append("svg:svg")
  .attr("width", gameBoard.boardWidth)
  .attr("height", gameBoard.boardHeight)
.append("g");



//Draw enemies
var enemy = svg.selectAll("image")
.data(drawEnemies(gameBoard.enemyNum))
.enter()
.append("image")
.attr("xlink:href", "./asteroid.png")
.attr("class", "enemy")
.attr("height", gameBoard.enemyHeight + "px")
.attr("width", gameBoard.enemyWidth + "px")
.attr("x", function(d){ return d.x;})
.attr("y", function(d){ return d.y; })


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

    //what's the player's position?
  var playerPos = d3.select(".player")
    var playerX = playerPos.attr("x");//soemthifdlafjklds
    var playerY = playerPos.attr("y");//llalala

  //Calculate distance from player  
  for (var i = 0; i < enemyPositionX.length; i++){
    var distance = Math.sqrt(Math.pow((enemyPositionX[i] - playerX),2) + Math.pow((enemyPositionY[i] - playerY),2));
    var radius = 12.5;

    if(distance<2*radius){
      //then we have a collision
      console.log("BOOM!");
      UpdateCollsion();
      UpdateHighScore();
      UpdateScore();
      //Subtract points
    }   
  }

  //What condition to add points?
    //Constantly-escalating points

  //Reset points to zero on collision

  //High score finder

}

setInterval(moveEnemies, 1000);

/* Dragging implementation references:

1) http://jsfiddle.net/mdml/da37B/
2) http://stackoverflow.com/questions/19911514/how-can-i-click-to-add-or-drag-in-d3
*/

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
 // console.log(x,y)
 
  d3.select(this).attr("x", x);
  d3.select(this).attr("y", y);
//  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}

//Make current player
var Player = svg.selectAll("image").select("g")
.data([1])
.enter()
.append("image")
.attr("xlink:href", "./enterprise.png")
.attr("height", gameBoard.enemyHeight + "px")
.attr("width", gameBoard.enemyWidth + "px")
.attr("x", "30")
.attr("y", "40")
.attr("class", "player")
.call(drag)

Player.on("click", function() {
  if (d3.event.defaultPrevented) return; // click suppressed
  console.log("click!");
});

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

UpdateScore(50);
UpdateHighScore(10);

setInterval(function(){d3.select(".current span").text((Number(d3.select(".current span").text())+1))}, 50);

//Wish list:

//1) Collision during transition
//2) Board "boundaries"
//3) Extra: Rotate the spaceship w/ mouse drag
//4) Random position for spaceship start
//5) Levels [change gameBoard parameters]
//6) Player-specified enemy count [reset button]



