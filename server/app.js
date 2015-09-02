// Libraries
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// Express setup
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Directory HAS TO EXIST - PREVIOUSLY CREATED!
var DOWNLOAD_DIR = 'downloads';

// Secrec KEY for preventing unauthorized downloads - CHOOSE YOURSELF (string)
var SECRET_KEY = undefined;

// Function to download file using HTTP.get
var download_file_httpget = function(file_url) {
	var options = {
		host: url.parse(file_url).host,
		port: 80,
		path: url.parse(file_url).pathname
	};

	var file_name = url.parse(file_url).pathname.split('/').pop();
	var file = fs.createWriteStream(DOWNLOAD_DIR + '/' + file_name);

	http.get(options, function(res) {
		res.on('data', function(data) {
			file.write(data);
		}).on('end', function() {
			file.end();
			console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
		});
	});
};

/*
 * DOWNLOAD -----------------------------------------------------------------------------------------------------------------
 */
app.get('/download', function (req, res) {
	var file_url = req.query.url,
		key = (req.query.key == undefined || req.query.key == '') ? undefined : req.query.key;

	if(SECRET_KEY == key){
		download_file_httpget(file_url);
		
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