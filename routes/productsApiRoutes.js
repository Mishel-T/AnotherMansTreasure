const db = require("../models");

module.exports = app => {
    // Get all products
    app.get("/api/products", (req, res) => {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        db.Product.findAll({
            where: query, 
            include: [db.User]
        })
            .then(dbProducts => {
                res.json(dbProducts);
            });
        // db.Example.findAll({
        //     where: {
        //         location: 'Riverside' //example
        //     }
        // }).then(dbExamples => {
        //     res.json(dbExamples);
        // });
    });

    // Create a new product
    app.post("/api/products", (req, res) => {
        console.log(req.body);
        db.Product
            .create(req.body)
            .then(dbUser => {
                res.json(dbUser);
            });
    });

    // PUT route for updating products
    app.put("/api/products", (req, res) => {
        db.Product.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(dbProducts => {
                res.json(dbProducts);
            });
    });

    // Delete an example by id
    app.delete("/api/products/:id", (req, res) => {
        db.Product
            .destroy({ where: { id: req.params.id } })
            .then(dbProducts => {
                res.json(dbProducts);
            });
    });
};
