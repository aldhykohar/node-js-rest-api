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

    //using sequelize
    app.route('/get_all').get(controller.mahasiswa.getAll)
    app.route('/get_by_id').get(controller.mahasiswa.getByID)
    app.route('/create_mhs').post(controller.mahasiswa.createMahasiswa)
    app.route('/edit_mhs').put(controller.mahasiswa.editMahasiswa)
    app.route('/delete_mhs').delete(controller.mahasiswa.deleteMahasiswa)
    app.route('/search_mhs').get(controller.mahasiswa.getSearch)
};