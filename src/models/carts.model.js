//importar mongoose
const mongoose = require("mongoose")

//aqui crear la coleccion
const cartsCollection = "carts"

//aqui es schema
const cartsSchema = new mongoose.Schema({

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product" // Hace referencia al modelo de Products
        }
    ],
    
})

//exportacion de mongoose
const cartsModel = mongoose.model(cartsCollection, cartsSchema)

module.exports = { cartsModel }