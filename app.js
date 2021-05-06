const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
require('./db');


const app = express();

// ===GLOBAL MIDDLEWARE=====
app.use(cookieParser());
app.use(express.json());

// ====ROUTES=====
app.use('/user', userRoutes);


app.listen(5000, () => console.log('Listening on port 5000'));