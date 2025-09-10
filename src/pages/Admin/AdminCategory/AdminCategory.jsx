import InputSearch from "@/components/Inputs/InputSearch";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import { Pagination } from "@/components/Tables/TablePagination";
import { TableStandard } from "@/components/Tables/TablesStandard";
import React, { useState } from "react";

const AdminCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const actions = [
    {
      title: "Edit",
      // icon: <BellIcon />,
      onClick: (row) => {
        console.log("Edit", row);
      },
    },
    {
      title: "Delete",
      // icon: <BellIcon />,
      onClick: (row) => {
        console.log("Delete", row);
      },
    },
  ];

  return (
    <AdminMainLayOut
      isAdd
      title={"Category management"}
      btnSaveLabel={"Create category"}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="max-w-[360px]">
          <InputSearch placeholder={"search"} iconLeft />
        </div>
      </div>
      <TableStandard data={paginatedData} columns={columns} actions={actions} />
      <Pagination
        totalItems={data.length}
        initialItemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(perPage) => setItemsPerPage(perPage)}
      />
    </AdminMainLayOut>
  );
};

const data = [
  {
    id: 1,
    title: "Cat",
  },
  {
    id: 2,
    title: "General",
  },
  {
    id: 3,
    title: "Inspiration",
  },
];

const columns = [
  {
    key: "title",
    header: "Category",
    render: (value) => (
      <div className="text-sm font-medium text-gray-900 leading-5 max-w-md">
        {value}
      </div>
    ),
  },
];

export default AdminCategory;
