const path = require('path');

module.exports = app => {
    // // Load index page
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, "../public/views/index.html"));
    // });

    // // Load account page
    // app.get('/account', (req, res) => {
    //     res.sendFile(path.join(__dirname, "../public/views/account.html"));
    // });
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/views/index.html"));
    });
    app.get("/users", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/views/profile.html"));
    });

    app.get("/account", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/views/account.html"));
    });

    app.get("/post", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/views/post.html"));
    });

    app.get("/results", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/views/results.html"));
    });

    // Render 404 page for any unmatched routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/views/404.html"));
    });
};
