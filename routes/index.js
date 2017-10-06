const userRoutes = require('./user-routes');
module.exports = function (app) {
    userRoutes(app);
};