import { userService } from "@/apiServices";
import AdminFilterBar from "@/components/Displays/AdminFilterBar";
import { BgLoading } from "@/components/Displays/BgLoading";
import ModalEmpty from "@/components/Displays/ModalEmpty";
import AddIcon from "@/components/Icons/AddIcon";
import BellIcon from "@/components/Icons/BellIcon";
import PenEdit from "@/components/Icons/PenEdit";
import TrashDelete from "@/components/Icons/TrashDelete";
import { InputDropdown } from "@/components/Inputs/InputDropdown";
import InputSearch from "@/components/Inputs/InputSearch";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import { Pagination } from "@/components/Tables/TablePagination";
import { TableStandard } from "@/components/Tables/TablesStandard";
import { Button } from "@/components/ui/button";
import AdminNavbarWidget from "@/components/widgets/AdminNavbarWidget";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminArticle = () => {
  const router = useNavigate();
  const { logout } = useAuth();
  const [_isBgLoading, _setIsBgLoading] = useState(true);
  const [_data, _setData] = useState([]);
  const [_paginationData, _setPaginationData] = useState({});
  const [_search, _setSearch] = useState();
  const [_page, _setPage] = useState();
  const [_renderModal, _setRenderModal] = useState(null);
  const [_dataCategory, _setDataCategory] = useState();
  const [_category, _setCategory] = useState();
  const [_status, _setStatus] = useState();

  const _fetchArticle = async () => {
    _setIsBgLoading(true);
    try {
      const query = new URLSearchParams();
      if (_search) query.append("search", _search);
      if (_page) query.append("page", _page);
      if (_status) query.append("status", _status);
      if (_category) query.append("category", _category);
      const queryString = query.toString() ? `?${query.toString()}` : "";
      const res = await userService.GET_ARTICLE(queryString);
      if (res.status === 200) {
        _setPaginationData({
          page: res.page,
          total: res.total,
          totalPages: res.totalPages,
        });
        _setData(res.data[0]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Fetch categories failed");
    } finally {
      _setIsBgLoading(false);
    }
  };

  useEffect(() => {
    _fetchArticle();
  }, [_search, _page, _status, _category]);

  const _fetchCategory = async () => {
    _setIsBgLoading(true);
    try {
      const res = await userService.GET_CATEGORY();
      if (res.status === 200) {
        _setDataCategory(res.categories);
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
  }, []);

  const _handleCreate = (id) => {
    router(`/admin/article/${id}`);
  };

  const _handleDelete = async (id) => {
    _setIsBgLoading(true);
    try {
      const res = await userService.DELETE_ARTICLE(id);
      if (res.status === 200) {
        toast.success("Article deleted successfully");
        _fetchArticle();
      } else if (res.status === 401) {
        logout();
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete article failed");
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
            <div className="text-h3 text-brown-31e! mb-6">Delete article</div>
            <div className="text-b1 text-brown-16b mb-6">
              Do you want to delete this article?
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
      title={"Article management"}
      btnSaveLabel={"Create article"}
      onSave={() => _handleCreate("create")}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="max-w-[360px]">
          <InputSearch
            placeholder={"search"}
            iconLeft
            handleSearch={_handleSearch}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <div className="w-[200px]">
            <InputDropdown
              isAdmin
              placeholder={"status"}
              options={[
                { value: "Draft", label: "Draft" },
                { value: "Publish", label: "Published" },
              ]}
              onChange={(e) => {
                _setStatus(e);
              }}
            />
          </div>
          <div className="w-[200px]">
            <InputDropdown
              isAdmin
              placeholder={"Category"}
              options={_dataCategory?.map((e) => ({
                value: e._id,
                label: e.name,
              }))}
              onChange={(e) => {
                _setCategory(e);
              }}
            />
          </div>
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
    key: "title",
    header: "Article Title",
    render: (value) => (
      <div className="max-w-[50lvw] flex-1 overflow-clip">{value}</div>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (value) => <div>{value?.name}</div>,
    width: "120px",
  },
  {
    key: "status",
    header: "Status",
    render: (value) => (
      <div>
        {value} {/* <StatusBadge status={value} /> */}{" "}
      </div>
    ),
    width: "120px",
  },
];

export default AdminArticle;
