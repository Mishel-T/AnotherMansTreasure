const db = require('../models');
const path = require('path');

module.exports = app => {
    // Load index page
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/views/index.html"));
        // db.Example.findAll({}).then(dbExamples => {
        //     res.render('index', {
        //         msg: 'Welcome!',
        //         examples: dbExamples
        //     });
        // });
    });

    // Load account page
    app.get('/account', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/views/account.html"));
        // db.Example.findAll({}).then(dbExamples => {
        //     res.render('index', {
        //         msg: 'Welcome!',
        //         examples: dbExamples
        //     });
        // });
    });

    // Load example page and pass in an example by id
    app.get('/example/:id', (req, res) => {
        db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
            res.render('example', {
                example: dbExample
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/views/404.html"));
    });
};
