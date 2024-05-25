require('dotenv').config()
const express = require('express');
const cors = require('cors');

const bookRoutes = require('./routes/books.js');
const userRoutes = require('./routes/users.js');

const app = express();

app.use(cors());

// app.method(path,handler);
app.use(express.json()); //middleware 

app.use('/books', bookRoutes)
app.use('/users', userRoutes)
app.use('/', (req, res) => {
    res.send('API is running')
})

app.listen(process.env.APP_PORT, ()=>{
    console.log(`Server Running at Port ${process.env.APP_PORT}`)
})