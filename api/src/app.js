//* Aqui creo el servidor y lo exporto
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const breedRouter = require('./routes/breedRouter.js');
const tempRouter = require('./routes/temperamentRouter.js');

const server = express();

//!Middlewares

server.use(morgan('dev'));
server.use(express.json());
server.use(cors())
server.use("/dogs", breedRouter);
server.use("/temperaments", tempRouter);


module.exports = server;