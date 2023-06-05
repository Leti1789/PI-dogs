//? Aqui se levanta el servidor y se pone a escuchar en un puerto

const server = require('./src/app.js');
const {database} = require('./src/db')

const PORT = 3001;

database.sync()
    .then(() => {
        server.listen(PORT,
        console.log('server listening on port', PORT))
    })
.catch((err)=> console.log(err.message))