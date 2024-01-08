const { UserModel } = require("../models/user");

const fetchProfileData = async (req, res) => {
    const userId = req.query;
    console.log("user id is ", userId);
    return res.status(200).json({ success: true })
    console.log("USER ID SIS ", userId);
    if (!userId) {
        return res.status(400).json({ msg: "No user id found" })
    }
    //fetch user details using userId;
    const userData = await UserModel.findById(userId);
    if (!userData) {
        return res.status(400).json({ msg: "No Data found!" })
    }

    const respData = {
        name: userData?.name,
        email: userData?.email,
        avatar: userData?.avatar,
        role: userData?.role
    }

    return res.status(200).json({ rData: respData })
}

module.exports = { fetchProfileData };