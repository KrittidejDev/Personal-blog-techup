export const TableStandard = ({ columns, data, actions, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm  border border-brown-6d1 not-first:${className}`}
    >
      {/* container กำหนด max-height + scroll */}
      {/* <div className="overflow-y-auto max-h-[60lvh]"> */}

      <table className="w-full border-collapse">
        {/* Header */}
        <thead className="bg-white  sticky top-0 z-10 shadow-lg">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: column.width || "auto" }}
                className={`py-3 px-6 text-b1 text-brown-16b! tracking-normal bg-white
                    ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th
                className="text-center py-3 px-6 text-b1 text-brown-16b! tracking-normal bg-white"
                style={{ width: "120px" }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={`transition-colors duration-150  ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-[#EFEEEB]"
              }`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  style={{ width: column.width || "auto" }}
                  className={`py-5 px-6 text-b1 text-brown-03b! ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {column.render ? (
                    column.render(row[column.key], row)
                  ) : (
                    <span>{row[column.key]}</span>
                  )}
                </td>
              ))}
              {actions && (
                <td className="py-4 px-6" style={{ width: "120px" }}>
                  <div className="flex items-center justify-end space-x-2">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className={`p-1 transition-colors duration-150 ${
                          action.className ||
                          "text-gray-400 hover:text-gray-600"
                        }`}
                        title={action.title}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
};
