import "./App.css";
import fakeData from "./MOCK_DATA.json";
import * as React from "react";
import { useTable } from "react-table";

function App() {
  const data = React.useMemo(() => fakeData, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "University",
        accessor: "university",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Add state management for pagination
  const [currentPage, setCurrentPage] = React.useState(0);
  //const entriesPerPage = 10;
  const [entriesPerPage, setEntriesPerPage] = React.useState(10);

  // Paginate Data
  const paginateData = React.useMemo(() => {
    const startIndex = currentPage * entriesPerPage;
    const lastIndex = startIndex + entriesPerPage;
    return rows.slice(startIndex, lastIndex);
  }, [currentPage, entriesPerPage, rows]);

  // Pagination Handlers
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(rows.length / entriesPerPage) - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {paginateData.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/*Pagination Section*/}
        <div className="pagination">
          <div>
            Rows per page:
            <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <span>
            {currentPage * entriesPerPage + 1} - {Math.min((currentPage + 1) * entriesPerPage, rows.length)} of {rows.length}
          </span>
          <button onClick={prevPage} disable={currentPage === 0}>
            Previous
          </button>
          <button onClick={nextPage} disabled={currentPage >= Math.ceil(rows.length / entriesPerPage) - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
