export const TableStandard = ({ columns, data, actions, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 not-first:${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 ">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider  ${
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
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="hover:bg-gray-50 transition-colors duration-150 "
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-4 px-6 ${
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
                      <span className="text-sm text-gray-900">
                        {row[column.key]}
                      </span>
                    )}
                  </td>
                ))}
                {actions && (
                  <td className="py-4 px-6">
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
      </div>
    </div>
  );
};
