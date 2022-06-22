import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";
import { useHistory } from "react-router-dom";
import { searchAction } from "../../actions/searchAction";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_RESET,
  SET_SEARCH_VALUE,
} from "../../reducers/types/searchTypes";
const Search = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.searchValue);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    dispatch({
      type: SET_SEARCH_VALUE,
      payload: e.target.value,
    });
    if (e.target.value === "") {
      dispatch({
        type: SEARCH_RESET,
      });
    } else {
      dispatch(searchAction(e.target.value));
    }
  };
  return (
    <form onSubmit={handleSubmit} className="searchBarContent">
      <input
        type="text"
        placeholder="search here..."
        className="searchBarInput"
        onFocus={() => history.push("/search")}
        value={value}
        onChange={handleChange}
      />
      <button type="submit" className="searchBarBtn">
        <SearchIcon fontSize="small" />
      </button>
    </form>
  );
};

export default Search;
