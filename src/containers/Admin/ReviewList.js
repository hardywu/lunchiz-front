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
import Button from '@material-ui/core/Button';
import { doFetchReviewList, doDeleteReview } from '../../actions';
import { globalRecords } from '../../utils';
import Review from '../../components/Review';

const ReviewList = ({
  idList, fetchReviewList, deleteReview, deleteLoading, total,
}) => {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  React.useEffect(
    () => { fetchReviewList({perPage, page}) },
    [fetchReviewList, perPage, page])

  if (!idList) return <CircularProgress />
  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }
  const reviews = idList.map(id => globalRecords[id]).filter(rev => rev);
  const deleteHandler = id => () => deleteReview(id);
  return (
    <Table>
      <TableBody>
      {
        reviews.map(rev => <TableRow key={rev.id}>
          <TableCell component="th" scope="row"><Review review={rev} /></TableCell>
          <TableCell align="right">
          <Button component={Link} to={`${rev.id}/edit`}>edit</Button>
          <Button disabled={deleteLoading} onClick={deleteHandler(rev.id)}>
            delete
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
  isAuthed: state.auth.signedIn,
  idList: state.reviews.idList,
  deleteLoading: state.reviews.deleteLoading,
  total: state.reviews.listTotal || 0,
}), (dispatch) => ({
  fetchReviewList: (params) => dispatch(doFetchReviewList(params)),
  deleteReview: (id) => dispatch(doDeleteReview(id)),
}))(ReviewList);
