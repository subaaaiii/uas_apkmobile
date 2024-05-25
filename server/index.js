require('dotenv').config()
const express = require('express');
const cors = require('cors');

const bookRoutes = require('./routes/books.js');
const userRoutes = require('./routes/users.js');
const categoriesRoutes = require('./routes/categories.js');

const app = express();

// app.method(path,handler);
app.use(cors());
app.use(express.json()); //middleware biar bisa nerima json

app.use('/books', bookRoutes)
app.use('/users', userRoutes)
app.use('/', (req, res) => {
    res.send('API is running')
})
app.use('/categories', categoriesRoutes)

app.listen(process.env.APP_PORT, ()=>{
    console.log(`Server Running at Port ${process.env.APP_PORT}`)
})