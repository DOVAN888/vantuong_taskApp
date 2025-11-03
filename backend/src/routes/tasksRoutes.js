import express from 'express';

import { getAllTasks } from '../controllers/tasksControllers.js';
import { createTask } from '../controllers/tasksControllers.js';
import { updateTask } from '../controllers/tasksControllers.js';
import { deleteTask } from '../controllers/tasksControllers.js';

const router = express.Router();
// test api get 
router.get('/', getAllTasks) 

//ap post 
router.post('/',createTask ) 

//api put 
router.put('/:id', updateTask)
// api delete 
router.delete('/:id',deleteTask)

export default router;
