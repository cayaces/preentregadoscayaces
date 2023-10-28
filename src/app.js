const express = require("express")
const productsRouter = require("./router/products.router")
const cartsRouter = require("./router/carts.router")
//const { default: mongoose } = require("mongoose")
const { engine } = require("express-handlebars")
//const exphbs = require("express-handlebars");
const path = require('path');
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

//Handlebars
//app.engine("handlebars", exphbs());
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
//app.set("views", path.resoleve(__dirname + "/views"))
app.set("views", path.join(__dirname, "views"));

app.use("/", express.static(__dirname + "/public"))


app.listen(PORT, () => {
    console.log(`Servidor escuchando en portal ${PORT}`);
});

//Conectando mongoose
mongoose.connect("mongodb+srv://coderClau:7725AmorCODER@coderclau.lgoc83w.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", {

})
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.log("Error al intentar conectarse a la DB", error)
    })


app.get("/products", async (req, res) => {
    let allProducts = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON())
    res.render("viewProducts", {
        title: "Vista Productos",
        products: allProducts
    })
})

app.get("/carts/:cid", async (req, res) => {
    let id = req.params.cid
    let allCarts = await cartsRouter.getCartWithProducts(id)
    res.render("viewCart", {
        title: "Vista Carro",
        carts: allCarts
    })
})


