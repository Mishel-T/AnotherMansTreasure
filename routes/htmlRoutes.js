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

    // Render 404 page for any unmatched routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/views/404.html"));
    });
};
