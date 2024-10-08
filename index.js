import express from 'express'
import cors from 'cors'
import rootRouter from './src/routes/root.router.js';

//create express object
const app = express();

//read data json
app.use(express.json());

//apply cors
app.use(cors());

//import root route
app.use(rootRouter);

//app listen on port 8080
app.listen(8080,()=>{
    console.log('Server is listenning on port 8080');
    
})