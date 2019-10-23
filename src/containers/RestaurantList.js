import React from 'react';
import { connect } from 'react-redux';
import { Link } from "@reach/router";
import Slider from '@material-ui/core/Slider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { doFetchRestaurantList } from '../actions';
import { globalRecords } from '../utils';

const RestaurantList = (props) => {
  const [[minRate, maxRate], setRateRange] = React.useState([0, 5]);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  const { restaurants, fetchList, total, ownerId } = props;
  const handleChange = (event, newVal) => setRateRange(newVal)
  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }
  React.useEffect(
    () => { fetchList({minRate, maxRate, page, perPage, ownerId}) },
    [minRate, maxRate, page, perPage, fetchList, ownerId]
  )
  return (
    <div>
      <Slider
        value={[minRate, maxRate]}
        max={5}
        min={0}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
      <Table>
        <TableBody>
        {
          restaurants && restaurants.map(
            restaurant => (<TableRow key={restaurant.id}>
              <TableCell><Link to={`/restaurant/${restaurant.id}`}>
                {restaurant.name}
              </Link></TableCell>
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
}), (dispatch) => ({
  fetchList: (params) => dispatch(doFetchRestaurantList(params)),
}))(RestaurantList);

