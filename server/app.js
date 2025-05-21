import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { executequery } from './db.js';
import { uploadImage } from './middlewares/multer.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/api", async (req, res)=>{
    try {
        let sql = 'select * from user'
        let result = await executequery(sql)
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        
        res.status(500).json(error)
    }
}) 

app.post("/api/create",uploadImage("users"), async (req, res)=>{
    try {
        const {name, email} = JSON.parse(req.body.data);
        console.log(req.files);
        console.log(req.body);
        
        // const sql = 'insert into user (name, email) VALUES (?,?)'
        // await executequery(sql, [name, email])
        res.status(200).json("hello")
    } catch (error) {
        res.status(500).json(error)
    } 
}) 


app.listen(4000, console.log("corriendo"));

