// start slingin' some d3 here.

//Initialize gameboard
var gameBoard = {
  boardWidth: 900,
  boardHeight: 900,
  enemyWidth: 15,
  enemyHeight: 15,
  enemyNum: 70

};

//Draw gameboard
var svg = d3.select('.container').append("svg:svg")
  .attr("width", gameBoard.boardWidth)
  .attr("height", gameBoard.boardHeight)
.append("g");


var qq = drawEnemies(20);
console.log(qq)

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

//Enemies move to a new *RANDOM* location every second

//Detect when enemies touch you

