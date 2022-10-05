import express, { json } from 'express';
import listEndpoints from 'express-list-endpoints';
import authorRouter from './api/authors/index.js';
const server = express()

const port = 3001

server.use(express.json())
server.use("/authors" , authorRouter)




server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log('the server is running on port', port)
})