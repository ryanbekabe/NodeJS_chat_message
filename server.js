var express = require("express");
var app = express();
var http = require("http").createServer(app);
var http = require("socket.io")(http);

var port = 3000;
http.listen(port, function() {
	console.log("Active port: " + port);
});

