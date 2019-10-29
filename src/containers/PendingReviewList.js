import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "@reach/router";
import { doFetchReviewList } from '../actions';
import { globalRecords } from '../utils';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Review from '../components/Review';

const PendingReviewList = ({
  userId, idList, fetchReviewList, total,
}) => {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  React.useEffect(
    () => { userId && fetchReviewList({ ownerId: userId, replied: false }) },
    [fetchReviewList, userId])

  if (!idList) return <CircularProgress />
  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  const reviews = idList.map(id => globalRecords[id]).filter(rev => rev);

  return (
      <Table>
        <TableBody>
        {
          reviews.map(rev => <TableRow key={rev.id} >
            <TableCell><Review review={rev} /></TableCell>
            <TableCell align="right">
              <Button component={Link} to={`reply/${rev.id}`} >
                Reply
              </Button>
              </TableCell>
            </TableRow>)
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
  );
}


export default connect((state) => ({
  userId: state.auth.user && state.auth.user.slice(5),
  idList: state.reviews.idList,
  total: state.reviews.listTotal || 0,
}), (dispatch) => ({
  fetchReviewList: (params) => dispatch(doFetchReviewList(params)),
}))(PendingReviewList);
