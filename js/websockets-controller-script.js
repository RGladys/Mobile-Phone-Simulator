//Make connection
var socket = io.connect('https://mobile-phone-simulator.herokuapp.com/');

//Answer if name can be used
socket.on('answer', login.answer)

//Returned ID
socket.on('myId', messagesMethods.myId)

//When someone connects
socket.on('users', messagesMethods.users);

//On incoming message
socket.on('message', messagesMethods.receive)
