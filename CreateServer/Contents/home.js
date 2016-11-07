$(function(){
	var template,jsonData;
	$.get("/templates/home.html",function(data){
		template=data;
	});
	$.getJSON("/json/home.json",function(data){
		jsonData=data;
	});

	$(document).ajaxStop(function(){

		$("body").html(Mustache.to_html(template,jsonData));
	})
});