import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { executequery, pool} from './db.js';
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

app.post("/api/saveImages", async (req, res)=>{
    try {
        console.log(req.body);
        res.status(200).json("todo ok");
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})
app.post("/api/create",uploadImage("users"), async (req, res)=>{
    let connection =  await pool.getConnection();
    const {name, email} = JSON.parse(req.body.data);
    const files = req.files;
    
    try {
        await connection.beginTransaction();
        const sql = 'insert into user (name, email) VALUES (?,?)';
        const [result] = await connection.execute(sql, [name, email]);
        console.log("222", result.insertId);
        
        let idFile = 0;
        files.forEach(async elem => {
            idFile++;
            const {filename} = elem;
            let sqlFile="INSERT INTO image (user_id, image_id, filename) VALUES(?,?,?)";
            await connection.execute(sqlFile, [result.insertId, idFile, filename])
        })
        
        await connection.commit();
        res.status(200).json({user_id: result.insertId})
    } catch (error) {
        await connection.rollback()
        console.log(error);
        
        res.status(500).json(error.message)
    }finally {
        connection.release();
    }
}) 


app.get("/api/user/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        let sql = 'SELECT user.*, image.user_id AS image_user_id, image.image_id, image.filename FROM user LEFT JOIN image ON user.user_id = image.user_id WHERE user.user_id = ?'
        let result = await executequery(sql,[id])
        console.log(result);

        let images = []

        result.forEach(e=>{
            if(e.image_id){
                images.push({user_id:e.image_user_id, image_id:e.image_id, filename:e.filename})
            }
        })
        
        const resFinal = {
            user_id: result[0].user_id,
            name: result[0].name,
            email: result[0].email,
            images    
        } 
        res.status(200).json(resFinal);
    } catch (error) {
        console.log(error);
        
        res.status(500).json(error)
    }
}) 
app.listen(4000, console.log("corriendo por el 4000"));

// let sql = 'SELECT user.*, travel.user_id AS travel_user_id, travel.travel_id, travel.country, travel.city, travel.description FROM user LEFT JOIN travel ON user.user_id = travel.user_id AND user_is_deleted = 0 AND travel_is_deleted = 0 WHERE user.user_id = ?'