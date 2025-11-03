import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils' // nếu bạn dùng shadcn

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,  // ✅ sửa tên prop
  page,
  totalPages,
}) => {
  // Tạo danh sách số trang hiển thị
  const pagesToShow = React.useMemo(() => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else if (page <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages)
    } else if (page >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
    }
    return pages
  }, [page, totalPages])

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}  // ✅ onClick
              className={cn(
                'cursor-pointer',
                page === 1 && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>

          {/* Các số trang */}
          {pagesToShow.map((p, idx) => (
            <PaginationItem key={idx}>
              {p === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault()
                    if (p !== page) handlePageChange(p)
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNext} // ✅ dùng PaginationNext + điều kiện đúng
              className={cn(
                'cursor-pointer',
                page === totalPages && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default TaskListPagination
