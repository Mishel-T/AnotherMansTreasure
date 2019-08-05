const db = require("../models");

module.exports = app => {
    // Get all accounts
    app.get("/api/users", (req, res) => {
        db.User.findAll({})
            .then(dbExamples => {
                res.json(dbExamples);
            });
        // db.Example.findAll({
        //     where: {
        //         location: 'Riverside' //example
        //     }
        // }).then(dbExamples => {
        //     res.json(dbExamples);
        // });
    });

    // Create a new account
    app.post("/api/users", (req, res) => {
        db.User
            .create(req.body)
            .then(dbUser => {
                res.json(dbUser);
            });
    });

    // Create a new example
    // app.post("/api/examples", (req, res) => {
    //     db.Example
    //         .create(req.body)
    //         .then(dbExample => {
    //             res.json(dbExample);
    //         });
    // });

    // Delete an example by id
    // app.delete("/api/examples/:id", (req, res) => {
    //     db.Example
    //         .destroy({ where: { id: req.params.id } })
    //         .then(dbExample => {
    //             res.json(dbExample);
    //         });
    // });
};
