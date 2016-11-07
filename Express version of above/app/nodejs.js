var express = require('express');
var cookieParser=require('cookie-parser')
var app = express();
var fs = require('fs'),
	basicAuth=require('basic-auth-connect');

app.use(express.static(__dirname+"/../static"));
app.use(cookieParser());
app.use(basicAuth("punita","1234"));

app.get('/favicon.ico',function(req,res){
	res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
});
app.get('/home',handle_home_request);
// app.get('/Contents/:js_file_name',function(req,res){
// 	handle_static_request("Contents/"+req.params.js_file_name,req,res);
// });
// app.get('/templates/:html_template_name',function(req,res){
// 	handle_static_request("templates/"+req.params.html_template_name,req,res);
// });
// app.get('/json/:json_file_name',function(req,res){
// 	handle_static_request("json/"+req.params.json_file_name,req,res);
// });
app.get('*',function(req,res){
	res.cookie("abc","pqr");
	res.write(JSON.stringify(req.cookies));
	res.end("No page Found!");
});


function handle_home_request(req,res){
	fs.readFile('main.html','utf8',function(err,data){
		if(err){
			res.writeHead(503, {'Content-Type': 'text/html'} );
			res.end("main.html not found");
		}
		else
			res.writeHead(200, {'Content-Type': 'text/html'} );
			res.end(data.replace("{{Page_Name}}",req.url.substr(1)));
	});
}

// function handle_static_request(url_entered,req,res){
// 	var rs = fs.createReadStream(url_entered);
// 	rs.on('readable',function(){
// 		if(d=rs.read())
// 		res.write(d);		
// 	});
// 	rs.on('end',function(){res.end();});
// 	rs.on('error',function(e){res.end(e);});
// }

app.listen(8080);