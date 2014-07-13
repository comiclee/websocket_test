var http = require("http");
var router = require("./router");

http.createServer(function(request, response) {
    router.route(request,response);
}).listen(8888);