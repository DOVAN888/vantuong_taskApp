//import { title } from 'process';
import React from 'react'
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';

const TaskList = ({ filteredTasks ,filter,handleTaskChanged}) => {

  
    // const filteredTasks = [
    //     {
    //         id: "1",
    //         title: "task 1",
    //         status: "active",
    //         completeAt: null,
    //         createdAt:new Date(),
    //     },
    //      {
    //         id: "2",
    //         title: "task 2",
    //         status: "active",
    //         completeAt: null,
    //         createdAt:new Date(),
    //     },
    // ]

    if (!filteredTasks || filteredTasks.length === 0) {
        return <TaskEmptyState filter={filter} />;     
    }
  
    return (
  <div className="space-y-3">
    {filteredTasks.map((task, index) => (
      <TaskCard
        key={task._id ?? index}
        task={task}   // <-- truyền phần tử hiện tại xuống dưới dạng prop "task"
        index={index}
        handleTaskChanged={handleTaskChanged}
      />
    ))}
  </div>
)

}

export default TaskList