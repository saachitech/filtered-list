import React from 'react';
import { useList } from '../business/providers/listProvider'
import DataGrid from '../components/ui/Table'
const Table = (props) => {
  const list = useList();
  return (
    <DataGrid
      {...props}
      pagination={list.pagination}
      onUpdatePagination={list.setPagination}
      onUpdateSort={list.onUpdateSort}
      checkboxSelection />
  )
}

export default Table;