const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { connectDb } = require("./db.js");
const { register } = require("./routes/register.js");
const registerForm = require("./routes/register.js")

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const port = 3001;
// app.get('/', function (req, res) {
//     res.json({ name: "gaurav" })
// });

// app.post("/register", function (req, res) {
//     register(req, res)
// })

app.use("/register", registerForm)


connectDb().then(() => {
    server.listen(port, () => {
        console.log(`server started at port ${port}`);
    })
})