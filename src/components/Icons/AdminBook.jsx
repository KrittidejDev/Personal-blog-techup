const AdminBook = ({ width = "24", height = "24", color = "#26231E" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="4" width="13" height="17" rx="2" stroke={color} />
      <path d="M15 10V8" stroke={color} stroke-linecap="round" />
      <path d="M4 9H8" stroke={color} stroke-linecap="round" />
      <path d="M4 13H8" stroke={color} stroke-linecap="round" />
      <path d="M4 17H8" stroke={color} stroke-linecap="round" />
    </svg>
  );
};

export default AdminBook;
