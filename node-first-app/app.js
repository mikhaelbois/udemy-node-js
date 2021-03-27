const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use Pug templates
// app.set('view engine', 'pug');
// app.set('views', 'views'); // Default views folder

// Use Handlebars templates
// const expressHbs = require('express-handlebars');
// app.engine('handlebars', expressHbs({
//     layoutsDir: 'views/layouts/', // Default value
//     defaultLayout: 'main-layout'
// }));
// app.set('view engine', 'handlebars');
// app.set('views', 'views'); // Default views folder

// Use EJS templates
app.set('view engine', 'ejs');
app.set('views', 'views'); // Default views folder

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Needed to gain access to the files in public

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { docTitle: '404 Error - Page not found', path: '' }); // Will use defined templating engine in app.js
});

app.listen(5000);