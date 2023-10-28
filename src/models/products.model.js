//importar mongoose
const mongoose = require("mongoose")

//aqui crear la coleccion
const productsCollection = "products"

//aqui el schema
const productsSchema = new mongoose.Schema({
    descripcion: { type: String, max: 1000, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String, max: 1000, required: true},
    categoria: { type: String, max: 50}
})

//exportacion de mongoose

const productsModel = mongoose.model(productsCollection, productsSchema)

module.exports = { productsModel }