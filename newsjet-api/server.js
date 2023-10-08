const port = process.env.PORT || 3000;
const app = require('./app')
const http = require('http');

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Node API is running in http://localhost:${port}`);
    //console.log(process.env.PORT)
});
