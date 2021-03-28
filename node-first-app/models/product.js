const fs = require('fs');
const path = require('path');
const rootdir = require('../util/path');

const filePath = path.join(rootdir, 'data', 'products.json');

const Cart = require('./cart');

const getProductsFromFile = callback => {
    fs.readFile(filePath, (error, fileContent) => {
        if (error) {
            return callback([]);
        }

        return callback(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // Instance
    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];

                updatedProducts[existingProductIndex] = this;
    
                fs.writeFile(filePath, JSON.stringify(updatedProducts), (writeError) => {
                    console.error(writeError);
                });
            } else {
                this.id = Math.random().toString();
        
                products.push(this);
    
                fs.writeFile(filePath, JSON.stringify(products), (writeError) => {
                    console.error(writeError);
                });
            }
        });
    }

    // Global
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            cb(products.find(product => product.id === id));
        });
    }

    static deleteById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id);
            const updatedProducts = products.filter(product => product.id !== id);

            fs.writeFile(filePath, JSON.stringify(updatedProducts), (writeError) => {
                if (!writeError) {
                    Cart.deleteProduct(id, product.price);
                } else {
                    console.error(writeError);
                }

                cb();
            });
        });
    }
}