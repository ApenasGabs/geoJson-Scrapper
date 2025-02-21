const express = require("express");
const bairroRoutes = require("./bairro");

const router = express.Router();

router.use(bairroRoutes);

module.exports = router;
