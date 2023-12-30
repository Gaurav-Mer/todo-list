const { TodoSchema } = require("../models/todo");
const cookieParser = require('cookie-parser');


const addNewTodo = async (req, res) => {
    const { title, description, dueDate, dueTime, assignTo, level, associateWith } = req.body;
    console.log("USER DATA IS ", req.userData);
    return res.status(400).json({ msg: "Can not added todo" })
    const newData = {
        title,
        description,
        dueDate,
        dueTime,
        assignTo,
        level,
        createdAt: new Date().getTime(),
        associateWith: []
    }
    const data = await TodoSchema.create(newData);
    if (data) {
        res.status(200).json({ msg: "Todo added successfully" })
    } else {
        res.status(400).json({ msg: "Can not added todo" })
    }


}


module.exports = { addNewTodo }