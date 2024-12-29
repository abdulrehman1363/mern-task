import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from './index';

const CustomDataTable = ({ columns, data, onEdit, onDelete, paginationServer, paginationTotalRows, currentPage, paginationPerPage, onChangePage }) => {
  const actionsColumn = {
    name: 'Actions',
    cell: (row) => (
      <div className="flex space-x-2">
        <Button onClick={() => onEdit(row)} className="bg-blue-500 hover:bg-blue-600">
          Update
        </Button>
        <Button onClick={() => onDelete(row._id)} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
      </div>
    ),
  };

  const finalColumns = [...columns, actionsColumn];

  return (
    <DataTable
      columns={finalColumns}
      data={data}
      highlightOnHover
      striped
      responsive
      pagination
      paginationServer={paginationServer}
      paginationTotalRows={paginationTotalRows}
      paginationPerPage={paginationPerPage}
      currentPage={currentPage}
      onChangePage={onChangePage}
    />
  );
};

export default CustomDataTable;
