const express = require('express');
const router = express.Router();
const { getAsync } = require("../redis");

/* GET index data. */
router.get('/', async (req, res) => {
  const counter = Number(await getAsync('counter') || 0);

  res.send({
    "added_todos": counter,
  });
});

module.exports = router;
