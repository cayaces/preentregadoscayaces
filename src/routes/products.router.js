const express = require('express');
const router = express.Router();

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

router.get("/products", (req, res) => {
    // Obtén la lista de productos y proporciona datos a la vista
    
    res.render("products", { products });
});

router.get('/api/products', (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Realiza filtrado según los parámetros
    let filteredProducts = products;
    if (query) {
        filteredProducts = filteredProducts.filter((product) =>
            product.categoria.includes(query) || product.stock.toString().includes(query)
        );
    }

    // Calcula el índice de inicio y final para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Limita los productos según los índices calculados
    const limitedProducts = filteredProducts.slice(startIndex, endIndex);

    // Realiza ordenamiento según el parámetro sort (asc/desc)
    if (sort) {
        if (sort === 'asc') {
            limitedProducts.sort((a, b) => a.precio - b.precio);
        } else if (sort === 'desc') {
            limitedProducts.sort((a, b) => b.precio - a.precio);
        }
    }

    // Calcula los valores relacionados con la paginación
    const totalPages = Math.ceil(filteredProducts.length / limit);
    const prevPage = page > 1 ? +page - 1 : null;
    const nextPage = page < totalPages ? +page + 1 : null;

    // Realiza ordenamiento según el parámetro sort (asc/desc)
    if (sort) {
        if (sort === 'asc') {
            limitedProducts.sort((a, b) => a.precio - b.precio);
        } else if (sort === 'desc') {
            limitedProducts.sort((a, b) => b.precio - a.precio);
        }
    }

    // Crea el objeto de respuesta con los productos limitados
    const response = {
        status: 'success',
        payload: limitedProducts,
        totalPages,
        prevPage,
        nextPage,
        page: +page,
        hasPrevPage: prevPage !== null,
        hasNextPage: nextPage !== null,
        prevLink: prevPage !== null ? `/api/products?page=${prevPage}` : null,
        nextLink: nextPage !== null ? `/api/products?page=${nextPage}` : null,
    };

    res.json(response);
});

router.get('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    console.log(pid)

    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(product);
});

router.post('/api/products', (req, res) => {

    const newProduct = req.body;

    if (!newProduct.id ||
        !newProduct.nombre ||
        !newProduct.precio ||
        !newProduct.descripcion ||
        !newProduct.codigo ||
        !newProduct.stock ||
        !newProduct.categoria) {
        res.json({ mesagge: "Producto agregado" })
    } else {

        return res.status(400).json({ message: 'Debe llenar todos los campos' });
    }

    products.push(newProduct);

});

router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'Tienes que completar al menos un campo' });
    }

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updateFields
    };

    return res.json(products[productIndex]);
});


router.delete('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);

    const productIndex = products.find((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    const deletedProduct = products.splice(productIndex, 1);

    return res.json(deletedProduct[0]);
});


module.exports = router;