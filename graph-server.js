var udpSocket = require('dgram').createSocket('udp4');	//Socket for receiving graph info
var app = require('express')();							//Express app				
var server = require('http').Server(app);				//Reference to http server. Is this actually needed?
var io = require('socket.io')(server);					//Websocket

//Listen for UDP packets on port 4000
udpSocket.bind(4000);

//Listen for websocket connection on port 80
server.listen(3000);

//Serve HTML file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

////////////////////////
//
// UDP connection
//
////////////////////////

//UDP connection response
udpSocket.on('listening', function() {
  var address = udpSocket.address();
  console.log('UDP server listening: ' + address.address + ':' + address.port);
});

//UDP error response
udpSocket.on('error', function (err) {
  console.log('UDP server error:\n ' + err.stack);
  udpSocket.close();
});

//UDP message received. Listen for emission of the "message" event, and pass through to browser via websocket
udpSocket.on('message', function (message) {
     console.log('received a message: ' + message);
     io.emit('message', message.toString());
 });

////////////////////////
//
// Websocket connection
//
////////////////////////

//Handle websocket connection
io.on('connection', function (socket) {
  socket.emit('message', { hello: 'world' });
  //socket.on('my other event', function (data) {
  //  console.log(data);
  //});
});