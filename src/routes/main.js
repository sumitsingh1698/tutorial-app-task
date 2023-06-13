const express = require('express');
const data = require('../repo/data.json');
const routes = express.Router();

routes.get("/:class/:chapter",(req,res) => {
    const classes = req.params.class;
    const chapter = req.params.chapter;
    const content = data.classes.find(ele => ele.key == classes)
    .chapters.find(ele => ele.key == chapter).artical[0].content;
    var result = {
        "content" : content,
        "nextPageUrl": "/api/class4/chapter1/artical/page2",
    }
    res.render("index", {data : result});
});

module.exports = routes;