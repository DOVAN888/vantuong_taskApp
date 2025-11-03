import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import api from '@/lib/axios'// hoặc import từ 'classnames'
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from 'lucide-react'

const TaskCard = ({ task, index,handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task?.title || '')
  


  // ham xoa 
  const deleteTask = async(taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`)
      toast.success('Task deleted successfully')
    handleTaskChanged?.()
    } catch (error) {
     console.error('Error delete task:', error)
      toast.error('Failed to delete task')
      
    }
  }

   // ham handkeypress de xu ly su kien nhan phim 
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            updatedTask()
        }
    }

  // ham update task 
  const updatedTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title:updateTaskTitle,
      })
      toast.success('Task updated successfully')
      handleTaskChanged();
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Failed to update task')
      
    }
  }

  // ham xu lu toggle ytrang thai complete va active 
  const toogleTaskCompleteButton = async () => {
    try {
      if (task.status === 'active') {
        await api.put(`/tasks/${task._id}`, {
          status: 'completed',
          completedAt: new Date().toISOString(),
        })
        toast.success(`Task "${task.title} " marked as completed`)
       
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: 'active',
          completedAt: null,
        })
        toast.success(`Task "${task.title} "marked as active`)
      }
       handleTaskChanged();
    } catch (error) {
      console.error('Error toggling task status:', error)
      toast.error('Failed to update task status')
    }
  }
  return (
    <Card
      className={cn(
        'p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
        task?.status === 'completed' && 'opacity-75 hover:opacity-100'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn trạng thái */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'flex-shrink-0 size-8 rounded-full transition-all duration-200',
            task?.status === 'completed'
              ? 'text-emerald-600 hover:text-emerald-700' // dùng màu Tailwind chuẩn
              : 'text-muted-foreground hover:text-primary'
          )}
          onClick={toogleTaskCompleteButton}
        >
          {task?.status === 'completed' ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* hiển thị / chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="Need to do something..."
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              defaultValue={task?.title ?? ''}
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}  //ham nay kich hoat khi nhan enter
              onBlur ={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task?.title || ''); // ham nay reset title neu khong luu hay nhan ngoai o input 
              }}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task?.status === 'completed'
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              )}
            >
              {task?.title}
            </p>
          )}

          {/* ngày tạo / ngày hoàn thành */}
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="size-3" />
            <span>{task?.createdAt ? new Date(task.createdAt).toLocaleString() : '-'}</span>

            {task?.completedAt && (
              <>
                <span>-</span>
                <Calendar className="size-3" />
                <span>{new Date(task.completedAt).toLocaleString()}</span>
              </>
            )}
          </div>
        </div>

        {/* nút sửa / xóa */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-sky-600"
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task?.title || '') // ham nay de load title hien tai khi nhan nut sua 
            }}
            
      >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-red-600"
           onClick={()=> deleteTask(task._id)}  
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard
