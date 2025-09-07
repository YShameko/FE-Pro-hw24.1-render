import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import url from "url";
import mongoose from "mongoose";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/db1';

console.log('MongoDB path is: ', mongoUrl);
mongoose.connect(mongoUrl);

mongoose.connection.on('open', () => {
    console.log('MongoDB is connected successfully');
});

mongoose.connection.on('error', () => {
    console.log('MongoDB is failed to connect');
});

const app = fastify();

app.register(fastifyStatic, {
    root: path.join(__dirname, '../client')
});

app.get('/api/user', (req, res) => {
    res.send('Hello from server!');
});

const port = process.env.PORT || 5555;
const host = process.env.HOST || 'localhost';

app.listen({ port, host })
    .then(() => {
        console.log('Server started at ' + host + ':' + port);
    })
    .catch((error) => {
        console.log('Server failed to start:' + error);
    })