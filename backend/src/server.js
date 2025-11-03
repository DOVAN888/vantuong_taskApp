import express from 'express';
import taskRoutes from './routes/tasksRoutes.js';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();


const app = express();

// middleware Cors
app.use(cors({origin:"http://localhost:5173"}))
const PORT = process.env.PORT ||5001;

// middleware để đọc JSON body cai nay kiem tra xem du lieu co the la jison khong neu co thi chuyen thanh object de su dung .
app.use(express.json());

// Gắn router với prefix /api/tasks
app.use('/api/tasks', taskRoutes);

connectDB().then(() => {
    // chạy server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

});


