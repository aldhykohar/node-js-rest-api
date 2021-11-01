'use strict';


module.exports = function (app) {
    var json = require('./controller');

    app.route('/').get(json.index);
    app.route('/show').get(json.showAllStudent);
    app.route('/show_by_id').post(json.showStudentById);
    app.route('/add_mahasiswa').post(json.addStudent);
    app.route('/edit_mahasiswa').put(json.editStudent);
    app.route('/delete_mahasiswa').delete(json.deletaStudent);
};