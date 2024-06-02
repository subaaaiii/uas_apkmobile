require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { join } = require("path");

const bookRoutes = require('./routes/books.js');
const userRoutes = require('./routes/users.js');
const categoriesRoutes = require('./routes/categories.js');

const app = express();

// app.method(path,handler);
app.use(cors());
app.use(express.json()); //middleware biar bisa nerima json
// app.use(express.static(join(__dirname, "images")));
app.use("/images/book", express.static('./images/book'))
app.use(express.urlencoded({ extended: false }));

app.use('/books', bookRoutes)
app.use('/users', userRoutes)
app.use('/categories', categoriesRoutes)
app.use('/', (req, res) => {
    res.send('API is running')
})

app.listen(process.env.APP_PORT, ()=>{
    console.log(`Server Running at Port ${process.env.APP_PORT}`)
})