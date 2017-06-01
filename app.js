var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	fs.readFile('index.html', 'utf-8', function(error, content){
		res.writeHead(200, {'Content-type':'text/html'});
		res.end(content);
	})
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.on('user', function(user){
		socket.user = user;
		socket.broadcast.emit('novo_user', socket.user);
	})

	socket.on('message', function(message_recebida){
		socket.broadcast.emit('message', {username: socket.user, message: message_recebida});
	})
});

server.listen(8080);