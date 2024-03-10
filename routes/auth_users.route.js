const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwtToken = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    try {
        const { email, name, password, } = req.body

        const isUsed = await User.findOne({ email })

        if (isUsed) {
            return res.status(300).json({ msg: 'User already registered' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email,
            name,
            password: hashedPassword,
        })

        await user.save()

        res.status(201).json({ msg: 'User successfully registered' })
    } catch (error) {
        console.error(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'Такого email нет в базе' })
        }
        // console.log(password, user.password)
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Пароли не совпадают' })
        }

        const jwtSecret = process.env.JWT_SECRET

        const token = jwtToken.sign(
            { userId: user.id },
            jwtSecret,
            { expiresIn: '10h' }
        )

        res.json({ token, userId: user.id, email, name: user.name })

    } catch (error) {
        console.error(error)
    }
})

module.exports = router