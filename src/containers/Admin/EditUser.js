import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import UserForm from '../../components/UserForm';
import { doFetchUser, doUpdateUser } from '../../actions';
import { globalRecords, normalizer } from '../../utils';

const EditUser = ({ fetchUser, userId, user, updateUser, errors }) => {
  React.useEffect(() => { fetchUser() }, [fetchUser]);
  if (!user) return <CircularProgress />

  return (<div>
      <UserForm
        email={user.email} username={user.username} errors={errors}
        type={user.role} onSubmit={updateUser} />
    </div>)
}

export default connect((state, { userId }) => ({
  user: globalRecords[normalizer.idToRecordId(userId, 'user')],
  errors: state.users.updateError,
}), (dispatch, { userId }) => ({
  fetchUser: () => dispatch(doFetchUser(userId)),
  updateUser: (data) => dispatch(
    doUpdateUser(userId, data, () => navigate('/admin/users'))),
}))(EditUser);
