var routeHandlers = require('./route-handlers');
var responseUtils = require('./response');
var static = require('./static');

var bootstrapMiddleware = function(app, argv) {
    if (argv.drakovHeader) {
        app.use(responseUtils.drakovHeaders);
    }
    if (argv.staticPaths) {
        static.setupRoutes(app, argv.staticPaths, argv.pathDelimiter);
    }
    app.use(responseUtils.corsHeaders(argv.disableCORS));
    app.use(responseUtils.delayedResponse(argv.delay));
    app.use(responseUtils.allowMethods(argv.method));
};

exports.init = function(app, argv, cb) {
    bootstrapMiddleware(app, argv);
    var options = {sourceFiles: argv.sourceFiles, autoOptions: argv.autoOptions};
    routeHandlers(options, function(err, middleware) {
        cb(err, middleware);
    });
};
