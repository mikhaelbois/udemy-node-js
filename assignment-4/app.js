const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const mainRoutes = require('./routes/main');
const usersRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(usersRoutes);
app.use(mainRoutes);

app.listen(5000);