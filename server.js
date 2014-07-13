var http = require("http");
var router = require("./router");

http.createServer(function(request, response) {
    try {
        router.route(request,response);
    } catch(e) {
        console.log(e);
    }
}).listen(8888);