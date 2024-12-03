const http = require('http');
const application = require('./src/config/express.config');

const server = http.createServer(application);


server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
