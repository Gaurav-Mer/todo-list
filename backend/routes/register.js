const register = (req, res) => {
    console.log("MY REQ IS ", req.body);
    res.send({ status: 200, message: "successfully" })
}

module.exports = { register }