const express = require('express');
const data = require("../repo/data.json");

const routes = express.Router();

routes.get("/:class/:chapter/:type/:page", (req, res) => {
  const classes = req.params.class;
  const chapter = req.params.chapter;
  const type = req.params.type;
  const page = req.params.page;
  const pageNo = parseInt(page.substring(4));
  let content = data.classes.find(ele => ele.key == classes)
    .chapters.find(ele => ele.key == chapter)
  let result;
  let nextPageExist;
  if (type === "video" && content.video.length > pageNo) {
    result = content.video[pageNo].content;
    nextPageExist =  content.video.length > pageNo + 1;
  }
  else if(content.artical.length > pageNo) {
    result = content.artical[pageNo].content;
    nextPageExist = content.artical.length > pageNo + 1;
  }
 
  if (!result) {
    res.json({});
  }
  var body = {
    "content": result,
    "nextPageUrl": nextPageExist ? "/api/" + classes + "/" + chapter + "/" + type + "/" + "page" + (pageNo + 1) : "" ,
  }
  res.json(body);
});

module.exports = routes;