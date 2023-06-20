require("dotenv/config")

const express = require("express");

const cors = require("cors")

const usersRouter = require('./routes/users')
// const ordersRouter = require("./routes/orders")

const app = express();
const port= 3000;

app.use(cors())

app.use(express.json());

app.use('/api/users', usersRouter)
// app.use('/api/orders', ordersRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port} http://localhost:3000`);
});

