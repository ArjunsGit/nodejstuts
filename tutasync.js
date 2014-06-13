var http = require("http");
var fs = require("fs");

http.createServer(function(req,res) {
	getcountries(res);
}).listen(8080,"127.0.0.1");

function getcountries (res) {
	fs.readFile("./countries.json",function(err, data) {
		if (err) {return hadError(err,res)};
		getHtmlTemplate(JSON.parse(data.toString()),res);
	})
}

function getHtmlTemplate(jsoncountries, res) {
	fs.readFile("./countryview.html", function(err,data) {
		if(err) return hadError(err,res);
		formatHtml(jsoncountries,data.toString(),res);
	})
}

function formatHtml (jsoncountries,templateview,res) {
	var html = templateview.replace("%",jsoncountries.join("</li><li>"));
	res.writeHead(200,{'Content-Type': 'text/html'});
	res.end(html);
}

function hadError(err,res) {
	console.error(err);
	res.end('Server Error');
}
