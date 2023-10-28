const express = require("express");
const router = express.Router();

const carts =[]

const products = [
    {
        nombre: "snapy",
        precio: 25000,
        stock: 50,
        categoria: "juguetes"   
    },
    {
        nombre: "huevo",
        precio: 1000,
        stock: 30,
        categoria: "juguetes"
    },
    {
        nombre: "lubricante",
        precio: 10000,
        stock: 10,
        categoria: "cosmeticos"
    },
    {
        nombre: "aceite de masaje",
        precio: 5000,
        stock: 40,
        categoria: "cosmeticos"
    },
    {
        nombre: "baby doll",
        precio: 25000,
        stock: 20,
        categoria: "lenceria"
    },
    {
        nombre: "transparente negro",
        precio: 35000,
        stock: 50,
        categoria: "lenceria"
    }
]

router.get('/api/carts/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find((cart) => cart.id === cartId);

        // Utiliza "populate" para obtener los productos completos
        CartModel.findById(cartId).populate('products').exec((err, cart) => {
            if (err || !cart) {
                return res.status(404).json({ error: 'Carrito no encontrado.' });
            }
    
            res.json(cart);
        });
   
});


router.post('/api/carts', (req, res) => {
    const cartId = carts.length + 1; 
    const cart = {
        id: cartId,
        products: []
    };

    for (let i = 0; i < 3; i++) {
        const randomProductIndex = Math.floor(Math.random() * products.length);
        const randomQuantity = Math.floor(Math.random() * 5) + 1; 
        const productToAdd = { ...products[randomProductIndex], quantity: randomQuantity };
        cart.products.push(productToAdd);
    }

    carts.push(cart);

    res.json({ message: 'Carrito creado exitosamente', cart });
});

router.post('/api/carts/:cid/products', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const product = products.find((product) => product.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    const cartProduct = { ...product, quantity };
    cart.products.push(cartProduct);

    res.json({ message: 'Producto agregado al carrito', cartProduct });
});

router.put('/api/carts/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const updatedProducts = req.body.products;

    // Encuentra el carrito por su ID
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Verifica que se proporcionó un arreglo de productos
    if (!Array.isArray(updatedProducts)) {
        return res.status(400).json({ error: 'Se requiere un arreglo de productos en el cuerpo de la solicitud.' });
    }

    // Reemplaza los productos en el carrito con los nuevos productos
    cart.products = updatedProducts;

    res.json({ message: 'Carrito actualizado exitosamente', cart });
});

// Actualiza la cantidad de ejemplares de un producto en el carrito
router.put('/api/carts/:cid/products/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const updatedQuantity = req.body.quantity;

    // Encuentra el carrito por su ID
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Encuentra el producto en el carrito
    const product = cart.products.find((product) => product.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
    }

    // Verifica que se proporcionó una cantidad válida
    if (isNaN(updatedQuantity) || updatedQuantity < 0) {
        return res.status(400).json({ error: 'La cantidad proporcionada no es válida.' });
    }

    // Actualiza la cantidad de ejemplares del producto en el carrito
    product.quantity = updatedQuantity;

    res.json({ message: 'Cantidad de ejemplares del producto actualizada exitosamente', product });
});


router.delete('/api/carts/:cid/products/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    // Encuentra el carrito por su ID
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Encuentra el índice del producto en el carrito
    const productIndex = cart.products.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
    }

    // Elimina el producto del carrito
    cart.products.splice(productIndex, 1);

    res.json({ message: 'Producto eliminado del carrito' });
});

// Agrega un nuevo endpoint DELETE para eliminar todos los productos de un carrito
router.delete('/api/carts/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);

    // Encuentra el carrito por su ID
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);

    if (cartIndex === -1) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Elimina todos los productos del carrito
    carts[cartIndex].products = [];

    res.json({ message: 'Todos los productos del carrito han sido eliminados exitosamente' });
});






module.exports = router;