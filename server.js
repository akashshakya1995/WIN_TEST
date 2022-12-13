const { createServer } = require("http");
const app = require('./app');
const port = 2022;
const server = createServer(app);
const { createNewAdmin } = require('./createAdminOnStartServer')
const { dbConnect } = require("./helper/dbConnection");
const sendRes=require('./helper/responseHandler')
dbConnect('dev').then(_ => {
    createNewAdmin('123456')
    server.listen(port, _ => console.log(`Server is Running on port ${port}`));
})