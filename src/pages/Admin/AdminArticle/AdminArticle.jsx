import AdminFilterBar from "@/components/Displays/AdminFilterBar";
import AddIcon from "@/components/Icons/AddIcon";
import BellIcon from "@/components/Icons/BellIcon";
import { InputDropdown } from "@/components/Inputs/InputDropdown";
import InputSearch from "@/components/Inputs/InputSearch";
import AdminMainLayOut from "@/components/MainLayouts/AdminMainLayOut";
import { Pagination } from "@/components/Tables/TablePagination";
import { TableStandard } from "@/components/Tables/TablesStandard";
import AdminNavbarWidget from "@/components/widgets/AdminNavbarWidget";
import React from "react";
import { useState } from "react";

const AdminArticle = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  // const handleEdit = (article) => {
  //   console.log("Edit article:", article);
  // };

  // const handleDelete = (article) => {
  //   console.log("Delete article:", article);
  // };

  const actions = [
    {
      title: "Edit",
      icon: <BellIcon />,
      onClick: (row) => {
        console.log("Edit", row);
      },
    },
    {
      title: "Delete",
      icon: <BellIcon />,
      onClick: (row) => {
        console.log("Delete", row);
      },
    },
  ];

  return (
    <AdminMainLayOut
      isAdd
      title={"Article management"}
      btnSaveLabel={"Create article"}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="max-w-[360px]">
          <InputSearch placeholder={"search"} iconLeft />
        </div>
        <div className="flex items-center gap-x-4">
          <div className="w-[200px]">
            <InputDropdown
              isAdmin
              placeholder={"status"}
              options={[
                { value: "1", label: "Drafted" },
                { value: "2", label: "Published" },
              ]}
              onChange={(e) => {
                console.log("drop click", e);
              }}
            />
          </div>
          <div className="w-[200px]">
            <InputDropdown
              isAdmin
              placeholder={"status"}
              options={[
                { value: "1", label: "Drafted" },
                { value: "2", label: "Published" },
              ]}
              onChange={(e) => {
                console.log("drop click", e);
              }}
            />
          </div>
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
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    category: "Cat",
    status: "Draft",
  },
  {
    id: 2,
    title:
      "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
    category: "Cat",
    status: "Published",
  },
  {
    id: 3,
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    category: "General",
    status: "Published",
  },
  {
    id: 4,
    title:
      "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
    category: "Cat",
    status: "Published",
  },
  {
    id: 5,
    title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
    category: "Cat",
    status: "Published",
  },
  {
    id: 6,
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    category: "Inspiration",
    status: "Published",
  },
  {
    id: 7,
    title: "Cat Training 101: Teaching Your Feline New Tricks",
    category: "Cat",
    status: "Draft",
  },
  {
    id: 8,
    title: "The Psychology of Success: Building Mental Resilience",
    category: "General",
    status: "Published",
  },
  {
    id: 9,
    title: "Indoor Plants That Are Safe for Cats",
    category: "Cat",
    status: "Published",
  },
  {
    id: 10,
    title: "Digital Detox: Finding Balance in a Connected World",
    category: "General",
    status: "Draft",
  },
  {
    id: 11,
    title: "Cat Nutrition: What Every Owner Should Know",
    category: "Cat",
    status: "Published",
  },
  {
    id: 12,
    title: "The Art of Mindfulness in Daily Life",
    category: "Inspiration",
    status: "Published",
  },
];

const columns = [
  {
    key: "title",
    header: "Article Title",
    render: (value) => (
      <div className="text-sm font-medium text-gray-900 leading-5 max-w-md">
        {value}
      </div>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (value) => <span className="text-sm text-gray-700">{value}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (value) => (
      <div>
        {value} {/* <StatusBadge status={value} /> */}{" "}
      </div>
    ),
  },
];

export default AdminArticle;
