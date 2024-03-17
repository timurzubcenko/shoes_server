const { Router } = require('express')
const router = Router()
const Order = require('../models/Order')
const { verifyToken } = require('../middleware/auth.middleware.js')

router.post('/create', verifyToken, async (req, res) => {
    try {
        const doc = Order({
            email: req.user.email,
            name: req.user.name,
            surname: req.body.surname,
            number: req.body.number,
            products: req.user.products,
            user: req.user._id,
            totalPrice: req.body.totalPrice,
            address: req.body.address,
            index: req.body.index,
        })

        const order = await doc.save()

        res.json(order)

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось создать order'
        })
    }
})

module.exports = router