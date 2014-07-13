var respond = function(request,response,content,type) {
    var contentType;
    switch (type) {
        case 'json' : contentType = 'application/json'; break;
        default : contentType = 'text/html';
    }
    response.writeHead(200, {"Content-Type": contentType});
    response.write(content);
    response.end();
};

exports.respond = respond;