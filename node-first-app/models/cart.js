const fs = require('fs');
const path = require('path');
const rootdir = require('../util/path');

const filePath = path.join(rootdir, 'data', 'cart.json');

const Product = require('./product');

module.exports = class Cart {
    static addProduct(id, price) {
        fs.readFile(filePath, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if (!error) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id, qty: 1 };
                cart.products = [ ...cart.products, updatedProduct ];
            }

            cart.totalPrice += +price; // +price converts to number

            fs.writeFile(filePath, JSON.stringify(cart), (writeError) => {
                console.error(writeError);
            });
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(filePath, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if (!error) {
                cart = JSON.parse(fileContent);
            } else {
                return;
            }

            if (cart.products.length === 0) {
                return;
            }

            const updatedCart = { ...cart };
            const product = updatedCart.products.find(p => p.id === id);

            if (!product) {
                return;
            }

            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;

            fs.writeFile(filePath, JSON.stringify(updatedCart), (writeError) => {
                console.error(writeError);
            });
        });
    }

    // Global
    static getCart(cb) {
        fs.readFile(filePath, (error, fileContent) => {
            if (!error) {
                cb(JSON.parse(fileContent));
            } else {
                cb(null);
            }
        });
    }
}