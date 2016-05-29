var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var angle = 0.0;
var fps = 15;

function sendMessage() {
	var date = new Date();
	angle += 5.0/60.0;
	var value = 0.5 * Math.sin(angle) + 0.5;
	var message = new Buffer(value.toString());
	client.send(message, 0, message.length, 4000, 'localhost');
}

setInterval(sendMessage, 1000/fps);