const express = require('express');
const app = express();


// app.use((req, res, next) => {
//     console.log('Middleware 1');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Middleware 2');

//     res.send('<h1>Middleware 2</h1>');
// });


app.use('/users', (req, res, next) => {
    res.send('<h1>Users</h1>');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Assignment 2</h1>');
});

app.listen(5000);