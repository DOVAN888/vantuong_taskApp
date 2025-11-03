import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import AddTask from '@/components/AddTask'
import StartsAndFilters from '@/components/StartsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { visibleTaskLimit as PAGE_SIZE } from '@/lib/data' // số item mỗi trang

const HomePage = () => {
  // buffer dữ liệu nhiệm vụ
  const [taskBuffer, setTaskBuffer] = useState([])

  // thống kê
  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completedTasksCount, setCompletedTasksCount] = useState(0)

  // bộ lọc trạng thái & phạm vi ngày
  const [filter, setFilter] = useState('all')      // 'all' | 'active' | 'completed'
  const [dataQuery, setDataQuery] = useState('today') // ví dụ: 'today' | 'week' | 'month'

  // phân trang
  const [page, setPage] = useState(1)

  // gọi API
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dataQuery}`)
      setTaskBuffer(res.data.tasks || [])
      setActiveTaskCount(res.data.activeCount ?? 0)
      setCompletedTasksCount(res.data.completedCount ?? 0)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      toast.error('Failed to fetch tasks')
    }
  }

  // áp dụng bộ lọc trạng thái
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active'
      case 'completed':
        return task.status === 'completed'
      default:
        return true
    }
  })

  // tổng số trang (ít nhất 1 để UI phân trang không vỡ)
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE))

  // mảng nhiệm vụ của trang hiện tại
  const paginatedTasks = filteredTasks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  // điều hướng trang
  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }
  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }
  const handlePageChange = (newPage) => {
    // chặn ngoài biên
    const target = Math.min(Math.max(newPage, 1), totalPages)
    setPage(target)
  }

  // khi có thay đổi nhiệm vụ (thêm/sửa/xóa) → nạp lại
  const handleTaskChanged = () => {
    fetchTasks()
  }

  // nạp dữ liệu khi mount & khi đổi phạm vi ngày
  useEffect(() => {
    fetchTasks()
  }, [dataQuery])

  // khi đổi filter hoặc phạm vi ngày → quay về trang 1
  useEffect(() => {
    setPage(1)
  }, [filter, dataQuery])

  // nếu vì lý do gì totalPages giảm, kẹp lại page
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages])

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Teal Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)',
          backgroundSize: '100% 100%',
        }}
      />

      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <Header />

          {/* Thêm nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Thống kê & Lọc */}
          <StartsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            // component này nhận prop tên "completeTasksCount"
            completeTasksCount={completedTasksCount}
          />

          {/* Danh sách nhiệm vụ (đã phân trang) */}
          <TaskList
            filteredTasks={paginatedTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/* Phân trang & Lọc theo ngày */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dataQuery={dataQuery}
              setDataQuery={setDataQuery}
            />
          </div>

          {/* Chân trang */}
          <Footer
            // Footer nhận "activeTasksCount" (có chữ s)
            activeTasksCount={activeTaskCount}
            // Footer nhận "completedTasksCount"
            completedTasksCount={completedTasksCount}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
