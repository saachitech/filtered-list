import { createContext, useContext, useEffect, useState } from "react";

/**
 * Define context
 */
const listContext = createContext();
/**
 * 
 * @returns 
 * Use context
 */
function useList() {
  return useContext(listContext);
}
/**
 * 
 * @returns 
 * List Provider
 */
function useListProvider() {
  const [filters, setFilters] = useState({})
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 })
  const [sort, setSorting] = useState({ order: null, orderBy: null })
  const onUpdateFilter = (values) => {
    setPagination({ offset: 0, limit: pagination.limit });
    setFilters(values)
  }
  const onUpdateSort = (order, orderBy) => setSorting({ order, orderBy })
  const getFilters = () => {
    return {
      ...filters,
      _order: sort.order,
      _sort: sort.orderBy,
      _start: pagination.offset,
      _limit: pagination.limit
    }
  }
  return {
    filters,
    pagination,
    sort,
    getFilters,
    setFilters,
    setPagination,
    setSorting,
    onUpdateSort,
    onUpdateFilter
  };
}
/**
 * 
 * @param {*} param0 
 * @returns 
 */
function ListProvider({ children }) {
  const list = useListProvider();
  return (
    <listContext.Provider value={list}>
      {children}
    </listContext.Provider>
  );
}
export {
  ListProvider,
  useList
}