const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

const db = require('./app/models')
db.connex.sync()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.json({message: 'bonjour'})
})

require('./app/routes/product.route') (app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`serveur démarré sur le port ${PORT}`)
})