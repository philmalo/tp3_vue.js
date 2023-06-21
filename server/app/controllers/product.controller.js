const db = require('../models')
const Product = db.products


exports.create = (req, res) => {
    Product.create(req.body).then(donnees => {
        res.send(donnees)
    }).catch(erreur => {
        res.status(500).send({
            message: 'Impossible d\'insérer les données.'
        })
    })
}

exports.findAll = (req, res) => {
    Product.findAll().then(donnees => {
        res.send(donnees)
    }).catch(erreur => {
        res.status(500).send({
            message: 'Une erreur est survenue.'
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Product.findByPk(id).then(donnees => {
        res.send(donnees)
    }).catch(erreur => {
        res.status(500).send({
            message: `Une erreur est survenue, impossible de trouver les données liées à l'id ${id}.`
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Product.destroy({
        where: {id:id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: 'Produit supprimé.'
            })
        }
        else{
            res.send({
                message: 'Impossible de supprimer le produit.'
            })
        }
    }).catch(erreur => {
        res.status(500).send({
            message: `Une erreur est survenue, impossible de trouver les données liées à l'id ${id}.`
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    Product.update(req.body, {
        where: {id:id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: 'Produit mis à jour.'
            })
        }
        else{
            res.send({
                message: 'Produit introuvable.'
            })
        }
    }).catch(erreur => {
        res.status(500).send({
            message:erreur.message || `Une erreur est survenue, impossible de trouver les données liées à l'id ${id}.`
        })
    })
}