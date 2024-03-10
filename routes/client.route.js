const { Router } = require('express')
const router = Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось найти клиентов'
        })
    }
})

module.exports = router