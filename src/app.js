const express = require("express")
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(PORT, () => {
    console.log(`Servidor escuchando en portal ${PORT}`);
});