const extractDataFromToken = require("../commonFunc/getToken");

const setAuth = async (req, res) => {
    const { jwt } = req.cookies;
    let rData = {}
    if (jwt) {
        const respData = await extractDataFromToken(jwt);
        if (respData && respData?.hasOwnProperty("status") && respData?.status === 200) {
            rData = respData?.data;
            return res.status(200).json({ msg: "successfull", rData })
        } else {
            return res.status(401).json({ msg: "unauthorize" })
        }
    }
    return res.status(401).json({ msg: "unauthorize" });
}


module.exports = { setAuth }