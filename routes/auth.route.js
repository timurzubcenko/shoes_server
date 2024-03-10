const { Router } = require('express')
const router = Router()
const Admin = require('../models/Admin')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwtToken = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    try {
        const { login, password, } = req.body

        const isUsed = await Admin.findOne({ login })

        if (isUsed) {
            return res.status(300).json({ msg: 'Admin already registered' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new Admin({
            login,
            password: hashedPassword,
        })

        await user.save()

        res.status(201).json({ msg: 'Admin successfully registered' })
    } catch (error) {
        console.error(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body

        const user = await Admin.findOne({ login })

        if (!user) {
            return res.status(400).json({ message: 'Такого login нет в базе' })
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
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id, login, })

    } catch (error) {
        console.error(error)
    }
})

module.exports = router