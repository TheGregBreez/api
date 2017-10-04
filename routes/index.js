const noteRoutes = require('./user-routes');
module.exports = function (app) {
    noteRoutes(app);
};