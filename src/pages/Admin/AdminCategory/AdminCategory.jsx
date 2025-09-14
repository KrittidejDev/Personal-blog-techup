import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import ModalEmpty from "@/components/Displays/ModalEmpty";
import PenEdit from "@/components/Icons/PenEdit";
import TrashDelete from "@/components/Icons/TrashDelete";
import InputSearch from "@/components/Inputs/InputSearch";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import { Pagination } from "@/components/Tables/TablePagination";
import { TableStandard } from "@/components/Tables/TablesStandard";
import { Button } from "@/components/ui/button";
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
  const [_renderModal, _setRenderModal] = useState(null);

  const _fetchCategory = async () => {
    _setIsBgLoading(true);
    // let queryString = "?";
    try {
      const query = new URLSearchParams();

      if (_search) query.append("search", _search);
      if (_page) query.append("page", _page);
      const queryString = query.toString() ? `?${query.toString()}` : "";

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
      onClick: (row) => {
        _setRenderModal(
          <div className="flex flex-col items-center pt-10 pb-5 w-[477px]">
            <div className="text-h3 text-brown-31e! mb-6">Delete category</div>
            <div className="text-b1 text-brown-16b mb-6">
              Do you want to delete this category?{" "}
            </div>
            <div className="flex justify-center items-center gap-x-2">
              <Button className={"btn-border-16b"} onClick={_handleCloseModal}>
                Cancel
              </Button>
              <Button
                className={"btn-31e"}
                onClick={() => _handleDelete(row._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const _handleCloseModal = () => {
    _setRenderModal(false);
  };

  return (
    <AdminMainLayOut
      isAdd
      title="Category management"
      btnSaveLabel="Create category"
      onSave={() => _handleCreate("create")}
    >
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
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <>
          <TableStandard data={_data} columns={columns} actions={actions} />
          <Pagination
            totalItems={_paginationData.total}
            currentPage={_paginationData.page}
            totalPages={_paginationData.totalPages}
            onPageChange={_handlePageChange}
          />
        </>
      )}
      <ModalEmpty
        isCloseBtn
        isShowModal={_renderModal ? true : false}
        onClose={_handleCloseModal}
      >
        {_renderModal}
      </ModalEmpty>
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
