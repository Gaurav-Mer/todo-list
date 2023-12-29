const { UserModel } = require("../models/user");

const signUp = async (req, res) => {
    const { name, email, password, avatar } = req.body;
    const isAlready = await UserModel.findOne({ email });
    if (isAlready) {
        return res.status(400).json({ msg: "EMAIL ALREADY EXIST" })
    }

    const userData = {
        name,
        email,
        password,
        avatar,
        u_id: `${new Date().getTime()}_${name}`,
        isActive: true
    }

    //validate data here :-
    const errorData = validateData(userData);
    if (errorData) {
        return res.status(400).json({ msg: errorData })
    }
    console.log("error data", errorData);
    //bcrypt password here
    const data = await UserModel.create(userData);
    console.log("data is ==>", data);
    res.status(200).json({ msg: "user added successfulluy" })
}

const testing = async (req, res) => {
    console.log("req is ", req.body);
    res.send({ name: "gaurav" })
}

const validateData = (data) => {
    if (!data?.name || data?.name?.length <= 0) {
        return "Invalid Name"
    }
    if (!data?.email || data?.email?.length <= 0) {
        return "Invalid Email"
    }
    if (!data?.password || data?.password?.length <= 0) {
        return "Invalid Password"
    }

}


module.exports = { signUp, testing }

