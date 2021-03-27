const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mainController = require('./controllers/main');

// Use EJS templates
app.set('view engine', 'ejs');
app.set('views', 'views'); // Default views folder

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Needed to gain access to the files in public

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(mainController.getNotFound);

app.listen(5000);