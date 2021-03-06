require("dotenv").config();
const express = require("express");
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const bodyParser = require('body-parser');

// Requiring our models for syncing
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Static directory
app.use(express.static("public"));
app.use(express.static("public/images"));
app.use(express.static("public/views"));
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser());

// Routes
require("./routes/usersApiRoutes")(app);
require("./routes/productsApiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./services/upload.js")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
    app.listen(PORT, () => {
        console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
    });
});

module.exports = app;
