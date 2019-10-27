import React from 'react';
import { connect } from 'react-redux';
import { Link } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { doFetchUserList, doUpdateUser, doDeleteUser } from '../../actions';
import { globalRecords } from '../../utils';

const UserList = ({
  idList, fetchUserList, deleteUser, deleteLoading, total,
}) => {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  React.useEffect(
    () => { fetchUserList({perPage, page}) },
    [fetchUserList, perPage, page])

  if (!idList) return <CircularProgress />
  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }
  const users = idList.map(id => globalRecords[id]).filter(rev => rev);
  const deleteHandler = id => () => deleteUser(id);
  return (
    <div>
      <Fade in={deleteLoading}>
        <LinearProgress />
      </Fade>
      <Table>
        <TableBody>
        {
          users.map(user => (<TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell align="right">
                <Link to={`${user.id}/edit`}>edit</Link>
                <Button disabled={deleteLoading} onClick={deleteHandler(user.id)}>
                  delete
                </Button>
              </TableCell>
            </TableRow>)
          )
        }
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={4}
              rowsPerPageOptions={[20, 50]}
              count={total}
              rowsPerPage={perPage}
              page={page - 1}
              SelectProps={{
                inputProps: { 'aria-label': 'Rows Per Page' },
                native: true,
              }}
              labelRowsPerPage='Rows Per Page'
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}


export default connect((state) => ({
  isAuthed: state.auth.signedIn,
  deleteLoading: state.users.deleteLoading,
  idList: state.users.idList,
  total: state.users.listTotal || 0,
}), (dispatch) => ({
  updateUser: (id, data) => dispatch(doUpdateUser(id, data)),
  deleteUser: (id) => dispatch(doDeleteUser(id)),
  fetchUserList: (params) => dispatch(doFetchUserList(params)),
}))(UserList);
