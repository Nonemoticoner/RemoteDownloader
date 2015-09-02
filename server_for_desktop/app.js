// Libraries
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Express setup
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Secrec KEY for preventing unauthorized downloads - CHOOSE YOURSELF (string)
var SECRET_KEY = undefined;

/*
 * DOWNLOAD -----------------------------------------------------------------------------------------------------------------
 */
app.get('/download', function (req, res) {
	var file_url = req.query.url,
		key = (req.query.key == undefined || req.query.key == '') ? undefined : req.query.key;

	if(SECRET_KEY == key){
		// here send info to desktop app about download
		// ...
		
		// response that everything went well
		res.send("OK! File will be downloaded!");
	}
	else{
		// tell that there's a wrong key
		res.send("Wrong key! Download will not proceed!");
	}
});

/*
 * HOME -----------------------------------------------------------------------------------------------------------------
 */
app.get('/', function (req, res) {
	res.send('RemoteDownloader by Asd Ent. All rights reserved. &copy; 2015');
});

/*
 * APP RUN --------------------------------------------------------------------------------------------------------------
 */
var server =app.listen(3006, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('RemoteDownloader server is listening at http://%s:%s', host, port);
});