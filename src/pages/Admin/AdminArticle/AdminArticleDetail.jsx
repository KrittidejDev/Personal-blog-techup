import { userService } from "@/apiServices";
import { BgLoading } from "@/components/Displays/BgLoading";
import ModalEmpty from "@/components/Displays/ModalEmpty";
import AdminArticleForm from "@/components/Forms/AdminArticleForm";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminArticleDetail = () => {
  const { user } = useAuth();
  const formRef = useRef();
  const { id } = useParams();
  const router = useNavigate();
  const [_isBgLoading, _setIsBgLoading] = useState(true);
  const [_data, _setData] = useState(null);
  const [_dataCategory, _setDataCategory] = useState();
  const [_renderModal, _setRenderModal] = useState(null);

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

  const _fetchInitData = async () => {
    _setIsBgLoading(true);
    try {
      if (id !== "create") {
        const res = await userService.GET_ARTICLE_BY_ID(id);
        if (res.status === 200) {
          _setData(res.data[0]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      _setIsBgLoading(false);
    }
  };

  useEffect(() => {
    _fetchInitData();
    _fetchCategory();
  }, []);

  const _handleSave = (status) => {
    formRef.current?.submit(status);
    _setIsBgLoading(true);
  };

  const _handleSubmit = async (data) => {
    _setIsBgLoading(true);
    try {
      let imageUrl = data.image;
      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append("file", data.image);
        const uploadRes = await userService.POST_FILE_UPLOAD(formData);
        if (uploadRes.url) {
          imageUrl = uploadRes.url;
        }
      }
      if (id === "create") {
        const res = await userService.POST_CREATE_ARTICLE({
          ...data,
          image: imageUrl,
        });
        if (res.status === 201) {
          toast.success("Article create successfully!");
        }
      } else if (id) {
        const res = await userService.PUT_EDIT_ARTICLE(_data._id, {
          ...data,
          image: imageUrl,
        });
        if (res.status === 200) {
          toast.success("Article update successfully!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed.");
    } finally {
      _setIsBgLoading(false);
      router("/admin/article");
    }
  };

  const _handleCloseModal = () => {
    _setRenderModal(null);
  };

  const _handleDelete = async (id) => {
    _setIsBgLoading(true);
    try {
      const res = await userService.DELETE_ARTICLE(id);
      if (res.status === 200) {
        toast.success("Article deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete article failed");
    } finally {
      router("/admin/article");
    }
  };

  const _onDelete = () => {
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
            onClick={() => _handleDelete(_data._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <AdminMainLayOut
      title={"Article management"}
      btnSaveLabel={"Save and publish"}
      onSave={() => _handleSave("Publish")}
      btnDraftLabel={"Save as draft"}
      onDraft={() => _handleSave("Draft")}
    >
      {_isBgLoading ? (
        <BgLoading />
      ) : (
        <AdminArticleForm
          onSubmit={_handleSubmit}
          initialData={_data}
          ref={formRef}
          categoryData={_dataCategory}
          authorData={user}
          onDelete={_onDelete}
        />
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

export default AdminArticleDetail;
