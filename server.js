const express = require('express')
const app = express();
const socket = require('socket.io');
const port = process.env.PORT || 8080;

//App setup
var server = app.listen(port, function(){
  console.log('Server on')
});
 
//Static files
app.use(express.static(__dirname));

//Socket setup
var io = socket(server),
    userList = [];

//Server events
io.sockets.on('connection', function(socket) {
  console.log(`Connected: ${socket.id}`);

  //Register name
  socket.on('login', function(data){

    //Return users id
    socket.emit('myId', {
      id: socket.id,
      name: data.name
    });

    //Push new user to a list
    userList.push({
      id: socket.id,
      name: data.name
    });

    //Return the current users list
    io.emit('users', userList);
  });

  //Ask if name is not already taken
  function ask(data){
    var name = data.name;
    for (let i in userList){
      if (userList[i].name == name){
        socket.emit('answer', false);
        return false
      }
    };
    socket.emit('answer', true);
  };
  socket.on('ask', ask);

  //Retrun when someone disconnects
  function disconnected(){
    var num;
    for (let i in userList){
      if (userList[i].id == socket.id){
        userList.splice(i, 1);
      }
    }

  };
  socket.on('disconnect', disconnected);

  //Message
  socket.on('message', function(data) {
    socket.broadcast.to(data.receiver).emit('message', data)
  })
});
