var http=require('http');
var url=require('url');
var server = http.createServer(function(req,res){
	var completelink=url.parse(req.url,true);
	var query=completelink.query;
	var mainlink=completelink.pathname;

	res.write("Link : "+mainlink+"\n"+"Query : "+JSON.stringify(query)+"\n\n");
	if(query.name=='punit')
		res.write("Good Choice!");
	else
		res.write("Nah! not a great choice");
	res.end("Yo");
}).listen(8080);