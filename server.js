var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function(){
    console.log("connected");
})
weath = "winter"
matrix = []

function matrixGenerator(matrixSize, grass, grassEater,predator,amenaker,doktor) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(Math.random()* matrixSize); 
        let customY = Math.floor(Math.random()* matrixSize);
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(Math.random() * matrixSize);
        let customY = Math.floor(Math.random() * matrixSize);
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(Math.random(0) * matrixSize);
        let customY = Math.floor(Math.random() * matrixSize);
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < amenaker; i++) {
        let customX = Math.floor(Math.random() * matrixSize);
        let customY = Math.floor(Math.random() * matrixSize);
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < doktor; i++) {
        let customX = Math.floor(Math.random() * matrixSize);
        let customY = Math.floor(Math.random() * matrixSize);
        matrix[customY][customX] = 5;
    }
    return matrix
}

io.sockets.emit("Send matrix",  matrixGenerator(40, 120, 20, 10, 10, 3))

grassArr = [];
grassEaterArr = [];
predatorArr = [];
amenakerArr = [];
doktorArr = [];


Amenaker = require("./Amenaker")
Doktor = require("./Doktor")
Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")

function createObject(matrix){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            if(matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            if(matrix[y][x] == 4) {
                let amenaker = new Amenaker(x, y);
                amenakerArr.push(amenaker);
            }
            if(matrix[y][x] == 5) {
                let doktor = new Doktor(x, y);
                doktorArr.push(doktor);
            }
        }
    }
    io.sockets.emit("Send matrix", matrix)
}

function game(){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in amenakerArr) {
        amenakerArr[i].eat();
    }
    for (var i in doktorArr) {
        doktorArr[i].eat();
    }
    io.sockets.emit("Send matrix", matrix)
}
setInterval(game, 1000)

function addOmnivore() {
    console.log(amenakerArr.length, "araj");
    for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length);
      var y = Math.floor(Math.random() * matrix.length);
      if (matrix[y][x] == 0) {
        matrix[y][x] = 4;
        amenakerArr.push(new Amenaker(x, y, 4));
      }else{
          i--
      }
      console.log(amenakerArr.length, "heto");
      
    }
    io.sockets.emit("send matrix", matrix);
  }


function deletehalf(){
    console.log(predatorArr.length, 'whole');
    
    predatorArr.splice(predatorArr.length / 2, predatorArr.length / 2)
    for(let i in predatorArr){
        let x = predatorArr[i].x 
        let y = predatorArr[i].y

        console.log(matrix[x][y])
        matrix[x][y] = 0

    }
    console.log(predatorArr.length, 'half');

}
function AddDoctor(){
    console.log(doktorArr.length, "araj");
    for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length);
      var y = Math.floor(Math.random() * matrix.length);
      if (matrix[y][x] == 0) {
        matrix[y][x] = 5;
        doktorArr.push(new Doktor(x, y, 5));
      }else{
          i--
      }
      console.log(doktorArr.length, "heto");
      
    }
    io.sockets.emit("send matrix", matrix);
    
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
  }
  setInterval(weather, 5000);


// io.on("connection", function (socket) {
//     createobject(matrix);
//     socket.on("Delete half", deletehalf );
//     socket.on("Try again", tryagain);
//     socket.on("Add Omnivore", addOmnivore);
//   });
io.on("connection", function (socket) {
    createObject(matrix);
    socket.on("Delete half", deletehalf);
    socket.on("Add Doctor", AddDoctor);
    socket.on("Add Omnivore", addOmnivore);
  });


  var statistics = {};
  setInterval(function() {
    statistics.Grass = grassArr.length;
    statistics.GrassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Amenaker = amenakerArr.length;
    statistics.Doktor = doktorArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)

