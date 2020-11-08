const path = require('path');
const express = require('express');
const app = express();

const mainRoutes = require('./routes/main');
const usersRoutes = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use(usersRoutes);
app.use(mainRoutes);

app.listen(5000);