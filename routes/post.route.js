const { Router } = require('express')
const router = Router()
const Product = require('../models/Product')
const User = require('../models/User')
const { verifyToken } = require('../middleware/auth.middleware.js')

router.post('/create', async (req, res) => {
    try {

        const doc = Product({
            id: req.body.id,
            title: req.body.title,
            img: req.body.img,
            price: req.body.price,
            desc: req.body.desc,
            sizes: req.body.sizes,
            img1: req.body.img1,
            img2: req.body.img2,
            img3: req.body.img3,
            img4: req.body.img4,
        })

        const product = await doc.save()

        res.json(product)

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось создать product'
        })
    }
})

router.get('/', async (req, res) => {
    try {

        const posts = await Product.find()

        res.json(posts)

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось найти products'
        })
    }
})

router.delete('/product/:id', async (req, res) => {
    try {

        const productId = req.params.id

        Product.findOneAndDelete({
            _id: productId
        })
            .then((doc) => {
                res.json({
                    success: true
                })
            })
            .catch((err) => {
                console.log(err)
            })

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось удалить product'
        })
    }
})

router.get('/product/:id', async (req, res) => {
    try {

        const productId = req.params.id

        Product.findOne({ _id: productId })
            .then((doc) => {
                res.json(doc)
            })
            .catch((err) => {
                console.log(err)
            })

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось найти product'
        })
    }
})

router.post('/addtobag/', verifyToken, async (req, res) => {
    try {
        const userId = req.user._id
        const doc = req.body._id

        const product = await Product.findById(doc)
        const userData = await User.findById(userId)

        await User.findByIdAndUpdate(userId, {
            products: [...userData.products, product]
        })

        res.status(200).json({ message: 'Товар добавлен в корзину', product })

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось добвать product в корзину'
        })
    }
})

router.get('/cart', verifyToken, async (req, res) => {
    try {

        const products = await Product.find({ _id: { $in: req.user.products } });
        res.json(products)

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось найти продукты'
        })
    }
})

router.delete('/cart/remove/:id', verifyToken, async (req, res) => {
    try {

        const productId = req.params.id
        const userId = req.user._id

        // const product = await Product.findById(productId)
        const user = await User.findById(userId)

        const newProducts = user.products.filter((product) => {
            return String(productId) !== String(product)
        })

        console.log(newProducts)

        await User.findByIdAndUpdate(userId, { products: newProducts })

        res.status(200).json({ message: 'Товар удален из корзины' })


    } catch (error) {
        console.log(error)
        res.json({
            message: 'Не удалось удалть продукт'
        })
    }
})

module.exports = router