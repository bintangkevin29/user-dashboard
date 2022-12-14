import React from "react";
import { useUserData } from "../../lib/custom-hook";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPage, showUpdate } from "../../redux/slices/user-interface.slice";
import Button from "../button/button.component";
import TablePagination from "../table-pagination/table-pagination.component";
import TDSortable from "../td-sortable/td-sortable.component";
import "./table.scss";

interface TableProps {
  tableData: UserData[];
}

const Table: React.FC<TableProps> = ({ tableData = [] }) => {
  const { page } = useAppSelector((state) => state.table.value);
  const { getPaginatedUserData, deleteUser } = useUserData();
  const { currentPageData, maxPage, startIndex } = getPaginatedUserData({
    page,
    length: 5,
  });
  const dispatch = useAppDispatch();
  return (
    <div className="table">
      <table className="table__table">
        <thead>
          <tr>
            <td>No</td>
            <TDSortable sortBy="nama">Nama</TDSortable>
            <TDSortable sortBy="pekerjaan">Pekerjaan</TDSortable>
            <TDSortable sortBy="alamat">Alamat</TDSortable>
            <TDSortable sortBy="tanggalLahir">Tanggal Lahir</TDSortable>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {currentPageData.length
            ? currentPageData.map((dt, i) => (
                <tr key={i}>
                  <td>{i + startIndex}</td>
                  <td>{dt.nama}</td>
                  <td>{dt.pekerjaan}</td>
                  <td>{dt.alamat}</td>
                  <td>{dt.tanggalLahir}</td>
                  <td className="table__button-group">
                    <Button
                      onClick={() => dispatch(showUpdate(dt))}
                      theme="primary"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => {
                        if (!window.confirm("Delete this item")) return;
                        if (currentPageData.length === 1) {
                          dispatch(setPage(page - 1));
                        }
                        deleteUser(dt.id);
                      }}
                      theme="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            : <tr>
              <td colSpan={6}>No data available, please add a new one</td></tr>}
        </tbody>
      </table>
      <div className="table__pagination">
        <TablePagination length={maxPage} />
      </div>
    </div>
  );
};

export default Table;
