import React from 'react';
import { useList } from '../business/providers/listProvider'
import Filters from '../components/ui/Filters'
const Table = (props) => {
  const list = useList();
  return (
    <Filters {...props} onUpdateFilter={list.onUpdateFilter} filters={list.filters} />
  )
}

export default Table;