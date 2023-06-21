module.exports = (connex, Sequelize) => {
    const Product = connex.define('product', {
        nom: {
            type: Sequelize.STRING
        },
        categorie: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        prix: {
            type: Sequelize.REAL
        },
        photo: {
            type: Sequelize.STRING
        }
    })
    return Product
}