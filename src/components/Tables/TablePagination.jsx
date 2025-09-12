import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export const Pagination = ({
  totalItems, // จาก API: total
  currentPage, // จาก API: page
  totalPages, // จาก API: totalPages
  showPageInfo = true,
  onPageChange, // ฟังก์ชันเรียกเมื่อเปลี่ยนหน้า
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * 1 + 1; // ปรับให้เริ่มจาก 1
  const endItem = Math.min(currentPage * 1, totalItems); // สมมติ API ส่งจำนวนต่อ page fixed แล้ว

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange?.(page);
  };

  const getVisiblePages = () => {
    const delta = 2; // จำนวนหน้าที่แสดงรอบ current
    const pages = [];
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  if (!totalItems || totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className="bg-white px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
      {/* Left side: info */}
      {showPageInfo && (
        <div className="text-sm text-gray-700">
          Showing {startItem} to {endItem} of {totalItems} entries
        </div>
      )}

      {/* Right side: pagination buttons */}
      <div className="flex items-center gap-1 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors rounded"
        >
          <ChevronLeft size={18} />
        </button>

        {visiblePages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={typeof page !== "number"}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : typeof page === "number"
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-400 cursor-default"
            }`}
          >
            {page === "..." ? <MoreHorizontal size={16} /> : page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors rounded"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
