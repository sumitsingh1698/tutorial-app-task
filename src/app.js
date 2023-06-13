const express = require("express");
const hbs = require('hbs');
const app = express();

const routes = require("./routes/main")
const apiRoutes = require("./routes/api")

app.use("/static",express.static("public"))
app.use('/tutorial',routes)
app.use('/api',apiRoutes)
// Template Engine
app.set('view engine','hbs')
app.set("views","views")
hbs.registerPartials("views/partials")

app.listen(process.env.PORT | 5556, () => {
    console.log("server started")
});