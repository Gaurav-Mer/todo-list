const { UserModel } = require("../models/user");
let bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const extractDataFromToken = require("../commonFunc/getToken")

const SECRET_KEY = "kUCHbji21@8*2dd"


const signUp = async (req, res) => {
    const { name, email, password, avatar } = req.body;
    const isAlready = await UserModel.findOne({ email });
    if (isAlready) {
        return res.status(400).json({ msg: "EMAIL ALREADY EXIST" })
    }

    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    const adminRole = ["gouravmer22@gmail.com"]

    const userData = {
        name,
        email,
        password: hashPassword,
        avatar,
        u_id: `${new Date().getTime()}_${name}`,
        isActive: true,
        role: adminRole?.includes(email) ? "admin" : "user"
    }

    //validate data here :-
    const errorData = validateData(userData);
    if (errorData) {
        return res.status(400).json({ msg: errorData })
    }
    console.log("error data", errorData);
    //bcrypt password here
    const data = await UserModel.create(userData);
    //jwt create here and set in cookie for httpOnly

    res.status(200).json({ msg: "user added successfulluy" })
}

const testing = async (req, res) => {
    console.log("req is ", req.body);
    res.send({ name: "gaurav" })
}

//  ---------------------LOGIC FOR THE LOGIN PURPUSE----------------------------------------
const login = async (req, res) => {
    const { email, password } = req.body;
    const isAlready = await UserModel.findOne({ email });
    if (!isAlready || isAlready === null) {
        return res.status(400).json({ msg: "No user Found" })
    }

    ///valdiate password here :-
    const pwMatch = await bcrypt.compare(password, isAlready.password);
    if (!pwMatch) {
        res.status(400).json({ msg: "Invalid Password" })
    } else {
        const token = jwt.sign({ id: isAlready?._id, name: isAlready?.name, email: isAlready?.email }, SECRET_KEY, { expiresIn: '1h' });

        // Set the JWT in an HttpOnly cookie
        const oneHourFromNow = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour in milliseconds
        res.cookie('jwt', token, { httpOnly: true, expires: oneHourFromNow, sameSite: 'None', secure: true });
        let userData = {};
        if (token) {
            const respData = await extractDataFromToken(token);
            if (respData && respData?.hasOwnProperty("status") && respData?.status === 200) {
                userData = respData?.data
            }
        }
        //checking that token email and currentEmail match then sending user data as well

        res.status(200).json({ msg: "Login Successfully", token: "token", rData: userData })
    }
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


module.exports = { signUp, testing, login }

