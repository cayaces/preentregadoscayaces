const express = require("express")
const productsRouter = require("./routes/products.router")
const cartsRouter = require("./routes/carts.router")
const { default: mongoose } = require("mongoose")
const { engine } = require("express-handlebars")
//const exphbs = require("express-handlebars");
const path = require('path');

const app = express();
const PORT = 8080;

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

//Handlebars
//app.engine("handlebars", exphbs());
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
//app.set("views", path.resoleve(__dirname + "/views"))
app.set("views", path.join(__dirname, "views"));


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



