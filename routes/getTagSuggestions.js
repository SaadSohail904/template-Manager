const express = require('express');
const router = express.Router();
const functions = require('../middleware/functions');
const auth = require("../middleware/auth");

/* GET users listing. */
router.post('/:tag/:tagType', async function(req, res, next) {
  try{
    let name = req.params.tag;
    let type = req.params.tagType;
    let query = `Select tagsuggestion from tagsuggestions where name like "%${name}%" and type = "${type}" order by tagsuggestion ASC`;
    let queryResults = await functions.runQuery(query);
    let tags = [];
    for(let i = 0; i < queryResults.length; i++){
      tags.push(queryResults[i].tagsuggestion);
    }
    res.send(tags);
  } catch (error) {
    res.send({statusCode:405, errorMessage:error.message});
  }
});

module.exports = router;
