const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mainController = require('./controllers/main');

const sequelize = require('./util/database');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const Product = require('./models/product');
const User = require('./models/user');

// Add relations between models
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product); // Optional
User.hasOne(Cart);
Cart.belongsTo(User); // Optional
Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order); // Optional
Order.belongsToMany(Product, {
    through: OrderItem
});

// Use EJS templates
app.set('view engine', 'ejs');
app.set('views', 'views'); // Default views folder

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Needed to gain access to the files in public

// Register user in app to access elsewhere
app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;

        next();
    }).catch(error => {
        console.error(error);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(mainController.getNotFound);

sequelize.sync({
    // Force table recreate
    // force: true
}).then(result => {
    // Create dummy User
    return User.findByPk(1);
}).then(user => {
    if (!user) {
        return User.create({
            name: 'John Doe',
            email: 'test@test.com'
        });
    }

    return user;
}).then(user => {
    return user.createCart();
}).then(() => {
    app.listen(5000);
}).catch(error => {
    console.error(error);
});