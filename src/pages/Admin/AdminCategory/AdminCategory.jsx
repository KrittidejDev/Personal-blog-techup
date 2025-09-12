import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import PenEdit from "@/components/Icons/PenEdit";
import TrashDelete from "@/components/Icons/TrashDelete";
import InputSearch from "@/components/Inputs/InputSearch";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import { Pagination } from "@/components/Tables/TablePagination";
import { TableStandard } from "@/components/Tables/TablesStandard";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminCategory = () => {
  const router = useNavigate();
  const [_isBgLoading, _setIsBgLoading] = useState(true);
  const [_data, _setData] = useState([]);
  const [_paginationData, _setPaginationData] = useState({});
  const [_search, _setSearch] = useState();
  const [_page, _setPage] = useState();

  const _fetchCategory = async () => {
    _setIsBgLoading(true);
    let queryString = "?";
    try {
      if (_search && _page) {
        queryString = queryString + `search=${_search}&page=${_page}`;
      } else if (_search) {
        queryString = queryString + `search=${_search}&page=1`;
      } else if (_page) {
        queryString = queryString + `page=${_page}`;
      }
      const res = await userService.GET_CATEGORY(queryString);
      if (res.status === 200) {
        _setPaginationData({
          page: res.page,
          total: res.total,
          totalPages: res.totalPages,
        });
        _setData(res.categories);
      }
    } catch (error) {
      console.error(error);
      toast.error("Fetch categories failed");
    } finally {
      _setIsBgLoading(false);
    }
  };

  useEffect(() => {
    _fetchCategory();
  }, [_search, _page]);

  const _handleCreate = (id) => {
    router(`/admin/category/${id}`);
  };

  const _handleDelete = async (id) => {
    _setIsBgLoading(true);
    try {
      const res = await userService.DELETE_CATEGORY(id);
      if (res.status === 200) {
        toast.success("Category deleted successfully");
        _fetchCategory();
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete category failed");
      _setIsBgLoading(false);
    }
  };

  const _handleSearch = (value) => {
    _setSearch(value);
  };

  const _handlePageChange = (newPage) => {
    _setPage(newPage);
  };

  const actions = [
    {
      title: "Edit",
      icon: <PenEdit />,
      onClick: (row) => _handleCreate(row._id),
    },
    {
      title: "Delete",
      icon: <TrashDelete />,
      onClick: (row) => _handleDelete(row._id),
    },
  ];

  return (
    <AdminMainLayOut
      isAdd
      title="Category management"
      btnSaveLabel="Create category"
      onSave={() => _handleCreate("create")}
    >
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="max-w-[360px]">
              <InputSearch
                placeholder="Search"
                iconLeft
                handleSearch={_handleSearch}
                value={_search || ""}
              />
            </div>
          </div>
          <TableStandard data={_data} columns={columns} actions={actions} />
          <Pagination
            totalItems={_paginationData.total}
            currentPage={_paginationData.page}
            totalPages={_paginationData.totalPages}
            onPageChange={_handlePageChange}
          />
        </>
      )}
    </AdminMainLayOut>
  );
};

const columns = [
  {
    key: "name",
    header: "Category",
    render: (value) => (
      <div className="text-sm font-medium text-gray-900 leading-5 max-w-md">
        {value}
      </div>
    ),
  },
];

export default AdminCategory;
