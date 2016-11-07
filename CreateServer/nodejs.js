var http = require('http');
var fs = require('fs');

http.createServer(incoming_req).listen(8080);

function incoming_req(req,res){

	var url_entered = req.url.toLowerCase();
	if (url_entered === '/favicon.ico') {
	    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
	    res.end();
	}
	else if(url_entered=="/home"){
		handle_home_request(req,res);
	}
	else if(url_entered.substr(0,10)=="/contents/"){
		handle_static_request("Contents/"+url_entered.substr(10),req,res);
	}
	else if(url_entered.substr(0,11)=="/templates/"){
		handle_static_request(url_entered.substr(1),req,res);
	}
	else if(url_entered.substr(0,6)=="/json/"){
		handle_static_request(url_entered.substr(1),req,res);
	}
	else
	res.end("No page Found!");
}

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

function handle_static_request(url_entered,req,res){
	var rs = fs.createReadStream(url_entered);
	rs.on('readable',function(){
		if(d=rs.read())
		res.write(d);		
	});
	rs.on('end',function(){res.end();});
	rs.on('error',function(e){res.end(e);});
}