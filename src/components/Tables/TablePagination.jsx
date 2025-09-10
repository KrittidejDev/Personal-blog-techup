import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export const Pagination = ({
  totalItems,
  initialItemsPerPage = 10,
  showItemsPerPage = true,
  showPageInfo = true,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    onItemsPerPageChange?.(newItemsPerPage);
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

  const visiblePages = getVisiblePages();
  const isPaginationVisible = totalItems > itemsPerPage;

  if (!isPaginationVisible) return null;

  return (
    <div className="bg-white px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
      {/* Left side: items per page + info */}
      <div className="flex items-center gap-3 flex-wrap">
        {showItemsPerPage && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>
        )}
        {showPageInfo && (
          <div className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {totalItems} entries
          </div>
        )}
      </div>

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
