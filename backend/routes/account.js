const express = require("express")
const router = express.Router()
const JWT_SECRET = require('../config')
const authMiddleware = require("../middleware")
const { Account, User, Transactions } = require("../db")
const mongoose = require("mongoose")

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session)
    if (!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({
            msg: "Insufficient balance"
        })
    }

    const toAccount = Account.findOne({ userId: to }).session(session)
    if (!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({
            msg: "Invalid Account"
        })
    }

    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
    ).session(session)
    await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
    ).session(session)
    await Transactions.create({
        id: req.body.to,
        
        $push: {
            transactions: {
                username: req.body.username,
                amount: req.body.amount,
                userId: req.userId
            }
        }
    })

    await session.commitTransaction()
    res.json({
        msg: "Transfer successful"
    })
})

module.exports = router