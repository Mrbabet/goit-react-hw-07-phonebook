import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filterSlice.js";
import { selectFilter } from "../../redux/selectors/contactsSelectors.js";
const Filter = () => {
  const value = useSelector(selectFilter);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <input
      type="text"
      id="filter"
      name="filter"
      value={value}
      onChange={handleChange}
    />
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
};
