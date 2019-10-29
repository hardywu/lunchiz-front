import React from 'react';
import { connect } from 'react-redux';
import { Link } from "@reach/router";
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { doFetchRestaurantList, doDeleteRestaurant } from '../../actions';
import { globalRecords } from '../../utils';
import RateSlider from '../../components/RateSlider';

const RestaurantList = ({
  restaurants, fetchList, total, deleteLoading, deleteRestaurant,
}) => {
  const [[minRate, maxRate], setRateRange] = React.useState([0, 5]);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  const handleChange = (event, newVal) => setRateRange(newVal)
  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }
  React.useEffect(
    () => { fetchList({minRate, maxRate, page, perPage}) },
    [minRate, maxRate, page, perPage, fetchList]
  )
  const deleteHandler = id => () => deleteRestaurant(id);
  return (
    <div>
      <RateSlider value={[minRate, maxRate]}  onChange={handleChange} />
      <Table>
        <TableBody>
        {
          restaurants && restaurants.map(
            restaurant => (<TableRow key={restaurant.id}>
              <TableCell><Link to={`/restaurant/${restaurant.id}`}>
                {restaurant.name}
              </Link></TableCell>
              <TableCell>
                <Rating value={Number(restaurant.rateAvg)} readOnly />
              </TableCell>
              <TableCell align="right">
                <Button component={Link} to={`${restaurant.id}/edit`}>edit</Button>
                <Button
                  disabled={deleteLoading}
                  onClick={deleteHandler(restaurant.id)}>
                  delete
                </Button>
              </TableCell>
            </TableRow>))
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

export default connect(state => ({
  restaurants: state.restaurants.idList &&
    state.restaurants.idList.map(id => globalRecords[id]),
  total: state.restaurants.listTotal || 0,
  deleteLoading: state.restaurants.deleteLoading,
}), (dispatch) => ({
  fetchList: (params) => dispatch(doFetchRestaurantList(params)),
  deleteRestaurant: (id) => dispatch(doDeleteRestaurant(id)),
}))(RestaurantList);
