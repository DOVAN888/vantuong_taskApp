import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
// import { title } from 'process'            //  thừa, gây lỗi bundler -> bỏ
import { toast } from 'sonner'
//import axios from 'axios'                     // cần dùng axios
import api from '@/lib/axios'

const AddTask = ({ handleNewTaskAdded }) => {   //  destructure props
    const [newTaskTitle, setnewTaskTitle] = useState('')

    const addTask = async () => {               //  không nhận tham số
        //  đảo điều kiện: rỗng thì báo lỗi, không gọi API
        if (newTaskTitle.trim() === '') {
            toast.error('Task title cannot be empty')
            return
        }
        try {
            await api.post('/tasks', {
                title: newTaskTitle.trim()
            })
            toast.success(`Task "${newTaskTitle}" added successfully`)
            handleNewTaskAdded?.() // goi ham su ly sau khi them task thanh cong de lay du lieu ra man hinh chinh
            setnewTaskTitle('')    //  clear ô nhập sau khi thêm
        } catch (error) {
            console.error('Error adding task:', error)
            toast.error('Failed to add task')
        }
    }

    // ham handkeypress de xu ly su kien nhan phim 
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    return (
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
          <div className='flex flex-col gap-3 sm:flex-row'>
              <Input
                  type='text'
                  placeholder='Add a new task...'
                  className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20'
                  value={newTaskTitle}
                  onChange={(e) => setnewTaskTitle(e.target.value)}  //  đúng camelCase
                  onKeyDown={handleKeyPress}                         //  đúng camelCase
              />
              <Button
                  variant='gradient'
                  size="xl"
                  className="px-6"
                    onClick={addTask}                                   //  đúng camelCase
                    disabled={newTaskTitle.trim() ===''}
              >
                  <Plus className="size-5" /> Add Task
              </Button>
          </div>
      </Card>
    )
}

export default AddTask
