'use strict';


module.exports = function (app) {
    var json = require('./controller');

    app.route('/').get(json.index);
    app.route('/show').get(json.showAllStudent);
    app.route('/show/:id').get(json.showStudentById);
};