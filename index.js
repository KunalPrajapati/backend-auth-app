const express = require('express');
require('dotenv').config();
require('./config/database').connect();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

//route importing and mounting

const user = require('./routes/user');
app.use('/api/v1', user);

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});