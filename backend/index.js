const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const cookieParser = require('cookie-parser');

const { connectDb } = require("./db.js");
const registerForm = require("./routes/register.js");
const loginRoute = require("./routes/login.js");
const addTodo = require("./routes/newTodo.js");
const authRoute = require("./routes/setAuth.js")

// app.use(cors());
// app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }));
app.use(cors({ credentials: true, origin: ["http://127.0.0.1:5173", "http://localhost:5173"] }));
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser());


const port = 3001;
// app.get('/', function (req, res) {
//     res.json({ name: "gaurav" })
// });

// app.post("/register", function (req, res) {
//     register(req, res)
// })

app.use("/register", registerForm);
app.use("/login", loginRoute);
app.use("/api/createTodo", addTodo);
app.use("/api/setAuth", authRoute);


connectDb().then(() => {
    server.listen(port, () => {
        console.log(`server started at port ${port}`);
    })
})