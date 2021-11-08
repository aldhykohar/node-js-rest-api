'use strict';


module.exports = function (app) {
    var json = require('./controller');
    var controller = require('./controller/index');

    app.route('/').get(json.index);
    app.route('/show').get(json.showAllStudent);
    app.route('/show_by_id').post(json.showStudentById);
    app.route('/add_mahasiswa').post(json.addStudent);
    app.route('/edit_mahasiswa').put(json.editStudent);
    app.route('/delete_mahasiswa').delete(json.deletaStudent);
    app.route('/show_group_matakuliah').get(json.showGroupMataKuliah);
    app.route('/getAll').get(controller.mahasiswa.getAll)
};