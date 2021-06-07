import { Divider, LinearProgress, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Table from '../../lib/Table'
import Filters from '../../lib/Filters'
import { getList } from '../../business/actions/users'
import { useList, ListProvider } from '../../business/providers/listProvider'
const columns = [
  { field: 'username', headerName: 'Username' },
  { field: 'email', headerName: 'E-mail' },
  { field: 'name', headerName: 'Name' },
  { field: 'phone', headerName: 'Phone' },
];
const _filters = [
  { id: 'username', type: 'TextField', label: "Username" },
  { id: 'email', type: 'TextField', label: "E-mail" },
  { id: 'name', type: 'TextField', label: "Name" }
]

function UserListPage() {
  const [users, setUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(10);
  const [busy, setBusy] = useState(false)
  let list = useList();
  const filterFields = [..._filters];
  useEffect(() => {
    setUsers([])
    loadUsers();
  }, [list.filters, list.pagination, list.sort])
  const loadUsers = () => {
    setBusy(true)
    getList(list.getFilters())
      .then(response => {
        let { total, data } = response;
        setTotalUsers(total)
        setUsers(data)
      })
      .finally(e => setBusy(false))
  }
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Paper>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
          <Typography variant="body2" component="div">Users</Typography>
        </div>
        <Divider />
        <div style={{ padding: 16 }}>
          <Filters data={filterFields} />
        </div>
        {busy ? <LinearProgress /> : null}
        <div style={{ padding: 16 }}>
          <Table
            idField={'id'}
            canSelect={false}
            route={'users'}
            canEdit={true}
            canView={true}
            title={'Users'}
            rows={users}
            columns={columns}
            count={totalUsers}
            checkboxSelection />
        </div>
      </Paper>
    </div>
  );
}


const List = () => <ListProvider><UserListPage /></ListProvider>

export default List