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
  svg.selectAll(".enemy")
    .transition()
    .attr("x", function(d){ return d.x + Math.random()*300;})
    .attr("y", function(d){ return d.y + Math.random()*300;})

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

