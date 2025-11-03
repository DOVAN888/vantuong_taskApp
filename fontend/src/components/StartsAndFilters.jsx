import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Filter } from 'lucide-react'
import { FilterType } from '@/lib/data'

const StartsAndFilters = ({
  completeTasksCount ,
  activeTaskCount ,
  filter = 'all',
 
  setFilter,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* thống kê (trái) */}
      <div className="flex gap-3">
        <Badge variant="secondary" className="bg-white/50 text-accent-foreground border-info/20">
          {activeTaskCount} <span className="ml-1">{FilterType.active}</span>
        </Badge>
       <Badge
            variant="secondary"
            className="bg-emerald-50 text-emerald-700 border-emerald-300"
            >
            {completeTasksCount} <span className="ml-1">{FilterType.completed}</span>
            </Badge>

      </div>

      {/* filter (phải) */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.entries(FilterType).map(([type, label]) => (
          <Button
            key={type}
            variant={filter === type ? 'gradient' : 'ghost'}
            size="sm"
            className="capitalize"
            onClick={() =>  setFilter?.(type)}
          >
            <Filter className="size-4 mr-1" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default StartsAndFilters
