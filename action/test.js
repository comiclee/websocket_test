var BaseAction = require('../lib/BaseAction');

var doAction = function(request,response) {
    BaseAction.respond(request,response,'hehe');
};

exports.doAction = doAction;