const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://poddarsourabh9939:sourabh123@cluster0.ss6mwde.mongodb.net/paytm")

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

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transactions: [
        {
            id: String,
            username: String,
            amount: String
        }
    ]
});

const User = mongoose.model("User", UserSchema)
const Account = mongoose.model("Account", AccountSchema)
const Transactions = mongoose.model("Transactions", TransactionSchema)

module.exports = { User, Account, Transactions }