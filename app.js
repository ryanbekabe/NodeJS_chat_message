var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
const tsc = Math.floor(ts/1000);

app.get('/', (req, res) => {
	//res.send('<h1>Hello world</h1>');
//	let ts = Date.now();
//	let date_ob = new Date(ts);
//        let date = date_ob.getDate();
//        let month = date_ob.getMonth() + 1;
//        let year = date_ob.getFullYear();
	//const tsc = Math.floor(ts/1000);
	var ip = res.socket.remoteAddress;
	console.log('IP: ' + ip + ' Jam: ' + date_ob + '-' + date + '-' + month + '-' + year);
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
//        let ts = Date.now();
//        let date_ob = new Date(ts);
//        let date = date_ob.getDate();
//        let month = date_ob.getMonth() + 1;
//        let year = date_ob.getFullYear();
//	const tsc = Math.floor(ts/1000);
	console.log('a user connected');
	socket.broadcast.emit('hi');
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg + date_ob + '-' + date + '-' + tsc);
		io.emit('chat message', msg + date_ob + '-' + date + '-' + month + '-' + tsc);
	});
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

http.listen(3000, () => {
  console.log('listening on *:3000');
});
