const db = require("../models");

module.exports = app => {
    // Get all accounts
    app.get("/api/users", (req, res) => {
        db.User.findAll({
            include: [db.Product]
        })
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


    //get all products by user
    app.get("/api/users", function (req, res) {
        var query  = {};
        if (req.query.UserId) {
            query.UserId = req.query.user_id
        }
        db.User.findAll({
            where: query
            
        }).then(function (dbUser) {
            res.json(dbUser);
        });
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
