import express from 'express';
import taskRoutes from './routes/tasksRoutes.js';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'
import path from "path"; // dung de  

dotenv.config();


const app = express();

// middleware Cors

const PORT = process.env.PORT ||5001;
const __dirname = path.resolve(); // dung de  lay duong dan thu muc hien tai danh cho viec deploy
// middleware để đọc JSON body cai nay kiem tra xem du lieu co the la jison khong neu co thi chuyen thanh object de su dung .
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({origin:"http://localhost:5173"}))
}

// Gắn router với prefix /api/tasks
app.use('/api/tasks', taskRoutes);

//phan deploy 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../fontend/dist")))// phuc vu file tinhtu tu thu muc dis sau khi build 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"../fontend/dist/index.html"))//phuc vu file index.html cho moi route khac 
})
}
connectDB().then(() => {
    // chạy server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

});


