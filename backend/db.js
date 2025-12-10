const mongoose = require("mongoose")
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

const UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

const AccountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})

const User = mongoose.model("User", UserSchema)
const Account = mongoose.model("Account", AccountSchema)

module.exports = { User, Account }