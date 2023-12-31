const express = require("express");
const { addNewTodo } = require("../controllers/newTodo");
const router = express.Router();
const validateToken = require("../middlleware/validateToken.js")

//middleware to check token
router.use("/", validateToken);
//routes
router.post("/", addNewTodo);

module.exports = router;