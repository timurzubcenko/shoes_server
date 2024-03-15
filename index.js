const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
    res.send("Server listening on port 5000");
})

app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/authusers', require('./routes/auth_users.route'))
app.use('/api/products', require('./routes/post.route'))
app.use('/api/clients', require('./routes/client.route'))
app.use('/api/order', require('./routes/order.route'))

async function start() {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.URL_MONGO)
        console.log('Connect to DB')
        app.listen(PORT, () => { console.log('Server has been started on port: ' + PORT) })
    } catch (error) {
        console.log(error)
    }
}
start()