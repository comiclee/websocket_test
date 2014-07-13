var url = require('url');
var fs = require('fs');

var staticTypes = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var staticMap = [
    [/^\/static\/(.*)\.(\w+)$/,'./static/$1.$2']
];

var routeMap = [
    [/^\/(.*)$/,'$1']
];
var getStaticPath = function(pathname) {
    var staticPath = null;
    for (var i= 0,len=staticMap.length; i<len; i++) {
        var reg = staticMap[i][0];
        var rep = staticMap[i][1];
        if (pathname.search(reg)>=0) {
            staticPath = pathname.replace(reg,rep);
            break;
        }
    }
    return staticPath;
};
var route = function(request,response) {
    var location = url.parse(request.url);
    console.log(location.pathname);

    var staticPath = getStaticPath(location.pathname);
    if (staticPath!=null) {
        var ext = staticPath.substring(staticPath.lastIndexOf('.')+1);
        fs.readFile(staticPath,'binary',function(err,file) {
            if (err) {
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write("404 Not Found");
                response.end();
            } else {
                response.writeHead(200, {"Content-Type": staticTypes[ext]});
                response.write(file,'binary');
                response.end();
            }
        });
        return;
    }

    var actionName = null;
    for (var i= 0,len=routeMap.length; i<len; i++) {
        var reg = routeMap[i][0];
        var rep = routeMap[i][1];
        if (location.pathname.search(reg)>=0) {
            actionName = location.pathname.replace(reg,rep);
            break;
        }
    }
    
    if (actionName==null) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
        return;
    }

    var actionFile = './action/'+actionName+'.js';
    try {
        var action = require(actionFile);
        action.doAction(request,response);
    } catch(e) {
        console.log(e);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
        return;
    }

};

exports.route = route;