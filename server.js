require("dotenv").config();
const express = require("express");

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
app.use(express.static("public/views"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/imgRoutes")(app);


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
