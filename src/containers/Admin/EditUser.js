import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserForm from '../../components/UserForm';
import { doFetchUser, doUpdateUser } from '../../actions';
import { globalRecords, idToRecordId } from '../../utils';

const EditUser = ({ fetchUser, userId, user, updateUser }) => {
  React.useEffect(() => { fetchUser() }, [fetchUser]);
  if (!user) return <CircularProgress />

  return (<div>
      <UserForm
        defaultEmail={user.email} defaultType={user.role} submit={updateUser}
      />
    </div>)
}

export default connect((state, { userId }) => ({
  user: globalRecords[idToRecordId(userId, 'user')],
}), (dispatch, { userId }) => ({
  fetchUser: () => dispatch(doFetchUser(userId)),
  updateUser: (data) => dispatch(doUpdateUser(userId, data)),
}))(EditUser);
