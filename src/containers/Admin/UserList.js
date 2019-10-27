import React from 'react';
import { connect } from 'react-redux';
import { Link } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { doFetchUserList, doUpdateUser, doDeleteUser } from '../../actions';
import { globalRecords } from '../../utils';

const UserList = ({idList, fetchUserList, deleteUser, deleteLoading}) => {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  React.useEffect(
    () => { fetchUserList({perPage, page}) },
    [fetchUserList, perPage, page])

  if (!idList) return <CircularProgress />

  const users = idList.map(id => globalRecords[id]).filter(rev => rev);
  const deleteHandler = id => () => deleteUser(id);
  return (
    <div>
      <Fade in={deleteLoading}>
        <LinearProgress />
      </Fade>
      UserList
      {
        users.map(user => (<tr key={user.id}>
            {user.email}
            <Link to={`${user.id}/edit`}>edit</Link>
            <Button disabled={deleteLoading} onClick={deleteHandler(user.id)}>
              delete
            </Button>
          </tr>)
        )
      }
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
