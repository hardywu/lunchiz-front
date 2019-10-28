import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Slider, Typography
} from '@material-ui/core';

const AirbnbSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus,&:hover,&$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);

const marks = [
  {
    value: 0,
    label: '0 Star',
  },
  {
    value: 1,
    label: '1 Star',
  },
  {
    value: 2,
    label: '2 Star',
  },
  {
    value: 3,
    label: '3 Star',
  },
  {
    value: 4,
    label: '4 Star',
  },
  {
    value: 5,
    label: '5 Star',
  },
];

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function({value, onChange}) {
  return (
    <div>
      <Typography gutterBottom >
        Customer Rate Range
      </Typography>
      <AirbnbSlider
        value={value}
        max={5}
        min={0}
        marks={marks}
        onChange={onChange}
        ThumbComponent={AirbnbThumbComponent}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>)
}
