// db.js
const mongoose = require('mongoose');
// let url = "mongodb+srv://gouravmer22:71ur1vmer@cluster0.sfhvlq8.mongodb.net/?retryWrites=true&w=majority"
let url = `mongodb+srv://gouravmer22:71ur1vmer@cluster0.pbqr3pl.mongodb.net/todo_app?retryWrites=true&w=majority`

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    u_id: { type: String, required: true, unique: true },
    isActive: { type: Boolean }
});

const connectDb = async () => {
    try {
        console.log("gaurav")
        await mongoose.connect(url);
        console.log("db connected")
    } catch (error) {
        console.log("db error is ", error)
    }
}

const UserModel = mongoose.model('UserSchema', UserSchema);
module.exports = { mongoose, UserModel, connectDb };

