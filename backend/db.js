const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://poddarsourabh9939:Sourabhh%40123@cluster0.scewquy.mongodb.net/paytm?retryWrites=true&w=majority&appName=Cluster0")
//mongodb+srv://poddarsourabh9939:<password>@cluster0.scewquy.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0

//mongodb+srv://poddarsourabh9939:Sourabhh%40123@cluster0.scewquy.mongodb.net/
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