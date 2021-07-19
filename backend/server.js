const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require("./Routes/routes")
const cors = require('cors')
var bodyParser = require('body-parser');

dotenv.config()

mongoose.connect("YOUR_MONGO_KEY_ACCESS_HERE", {
    socketTimeoutMS: 0,
    connectTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use(express.json())
app.use(cors())
app.use(routesUrls)
app.listen(process.env.PORT || 4000)