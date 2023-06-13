const express = require("express");

const hbs = require("hbs");

const app = express();

const routes = require("./routes/main")
const apiRoutes = require("./routes/api")
const router = express.Router();

app.use("/static", express.static("public"))
app.use('/tutorial', routes)
app.use('/api', apiRoutes)

router.get("/", (req, res) => {
    res.render("hello");
})

// Template Engine

app.set('view engine', 'hbs')
app.set("views", "views")
hbs.registerPartials("views/partials")

app.listen(3000, () => {
    console.log("started");
});

// app.use(`/.netlify/functions/app`, router);

// module.exports = app;
// module.exports = serverless(app);
