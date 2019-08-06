const db = require("../models");

module.exports = app => {
    // Get all accounts
    app.get("/api/users", (req, res) => {
        db.User.findAll({})
            .then(dbUser => {
                res.json(dbUser);
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

    // PUT route for updating users
    app.put("/api/users", (req, res) => {
        db.User.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(dbUser => {
                res.json(dbUser);
            });
    });

    // Delete an example by id
    app.delete("/api/users/:id", (req, res) => {
        db.Example
            .destroy({ where: { id: req.params.id } })
            .then(dbUser => {
                res.json(dbUser);
            });
    });
};
