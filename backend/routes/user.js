const express = require("express")
const { User, Account } = require("../db")
const router = express.Router()
const { userSchema, updateBody } = require('./validation')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')
const authMiddleware = require("../middleware")


router.post("/signup", async (req, res) => {
    const body = req.body

    const { success } = userSchema.safeParse(body)

    if (!success) {
        res.status(400).json(
            {
                msg: success
            })
    }
    else {
        if (await User.findOne({ username: body.username })) {
            res.status(411).json(
                {
                    msg: `${body.username} is not available as the username`
                })
        }
        else if (await User.findOne({ firstName: body.firstName })) {
            res.status(412).json(
                {
                    msg: `${body.firstName} is not available as the firstName`
                })
        }
        else {
            const dbUser = await User.create(body)

            const account = await Account.create({
                userId: dbUser._id,
                balance: Math.floor(Math.random() * 10000) + 1
            })

            const token = jwt.sign(
                {
                    userId: dbUser._id
                }, JWT_SECRET)

            res.status(200).json(
                {
                    msg: "user created successfully",
                    token: token
                })
        }
    }
})

router.post("/signin", async (req, res) => {
    const body = req.body

    const { success } = updateBody.safeParse(body)

    if (!success) {
        res.status(400).json(
            {
                msg: "incorrect format of inputs"
            })
    }

    const dbUser = await User.findOne({ username: body.username, password: body.password })

    if (!dbUser) {
        res.status(411).json({
            msg: `no account exists with this username`
        })
    }

    else {
        const token = jwt.sign({
            userId: dbUser._id
        }, JWT_SECRET)

        res.status(200).json({
            msg: "you are now signed in",
            token: token
        })
    }
})

router.put("/", authMiddleware, async (req, res) => {
    const body = req.body

    const { success } = updateBody.safeParse(body)

    if (!success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
    }

    await User.updateOne(
        { _id: req.userId },
        body
    )

    res.status(200).json({
        msg: "updated successfully"
    })
})

router.get("/me", authMiddleware, async (req, res) => {
    const id = req.userId
    const user = await User.findOne({ _id: id })
    if (id) {
        res.json({
            signal: true,
            user
        })
    }
    else {
        res.json({
            signal: false
        })
    }
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || " "
    if (filter != " ") {
        let users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }]
        })
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id
            }))
        })
    }
    else {
        let users = await User.find({})
        let id = req.userId
        const user = await User.findOne({ _id: id })
        users = users.filter(user => user._id.toString() !== id);

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id
            }))
        })
    }

})

module.exports = router