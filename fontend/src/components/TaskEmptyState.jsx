import { Circle } from 'lucide-react'
import React from 'react'
import { Card } from '@/components/ui/card'

const TaskEmptyState = ({filter}) => {
  return (
      <Card
          className ="p-8 text-center border-0 bg-gradient-card shadow-custom-md"
      >
          <div className='space-y-3'>
              <Circle className="mx-auto size-12 text-muted-foreground" />
              <h3 className='font-medium text-foreground'>
                  
                  {
                      filter === 'active' ? 'No active tasks' : filter ==='completed' ? 'No completed tasks': 'No tasks yet'
                          
                  }
                  
              </h3>
              <p className='text-sm text-muted-foreground'>
                  {
                      filter === 'all' ?
                          "create tasks to get started!":`switch to "All" to see  the task here ${filter === 'active'?'active':'compeleted'}`
                  }
                  
              </p>
              
          </div>
          
    </Card>
  )
}

export default TaskEmptyState