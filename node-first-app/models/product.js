const fs = require('fs');
const path = require('path');
const rootdir = require('../util/path');

const filePath = path.join(rootdir, 'data', 'products.json');

const getProductsFromFile = callback => {
    fs.readFile(filePath, (error, fileContent) => {
        if (error) {
            return callback([]);
        }

        return callback(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    // Instance
    save() {
        getProductsFromFile(products => {
            products.push(this);

            fs.writeFile(filePath, JSON.stringify(products), (writeError) => {
                console.error(writeError);
            });
        });
    }

    // Global
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}