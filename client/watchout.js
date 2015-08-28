// start slingin' some d3 here.

//Initialize gameboard
var gameBoard = {
  boardWidth: 900,
  boardHeight: 900,
  enemyWidth: 25,
  enemyHeight: 25,
  enemyNum: 70

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
.attr("x", function(d){ return d.x + "px";})
.attr("y", function(d){ return d.y + "px"; })


function drawEnemies(n){
  var output = [];

  for (var i = 0; i < n; i++){
    output.push({id: i, x: Math.random()*gameBoard.boardWidth, y: Math.random()*gameBoard.boardHeight})
  }

  return output;

}

function moveEnemies(){
  svg.selectAll("image")
    .transition()
    .attr("x", function(d){ return d.x + Math.random()*300 + "px";})
    .attr("y", function(d){ return d.y + Math.random()*300 + "px"; })

}

setInterval(moveEnemies , 1000);

//Enemies move to a new *RANDOM* location every second

//Detect when enemies touch you

