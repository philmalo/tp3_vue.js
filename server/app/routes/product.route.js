module.exports = app => {

    const product = require('../controllers/product.controller.js')
    const router = require('express').Router()

    // tout afficher
    router.get('/', product.findAll)

    // créer un produit
    router.post('/', product.create)

    // afficher un produit
    router.get('/:id', product.findOne)

    // supprimer un produit
    router.delete('/:id', product.delete)

    // mettre à jour un produit
    router.put('/:id', product.update)

    app.use('/api/product', router)
}