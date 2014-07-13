var url = require('url');

var routeMap = [
    [/^\/(.*)$/,'$1']
];
var route = function(request,response) {
    var location = url.parse(request.url);
    var actionName = null;
    for (var i= 0,len=routeMap.length; i<len; i++) {
        if (location.pathname.search(routeMap[0])>=0) {
            actionName = location.pathname.replace(routeMap[0],routeMap[1]);
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
    var action = require(actionFile);
    action.doAction(request,response);
};

exports.route = route;