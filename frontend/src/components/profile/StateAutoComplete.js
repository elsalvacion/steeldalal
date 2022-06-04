import React from "react";
import Autocomplete from "react-autocomplete";
import { states } from "../../constants/cities";
const StateAutoComplete = ({ value, handleChange }) => {
  return (
    <Autocomplete
      getItemValue={(item) => item}
      items={states}
      renderItem={(item, isHighlighted) => (
        <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
          {item}
        </div>
      )}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      onSelect={(val) => handleChange(val)}
    />
  );
};

export default StateAutoComplete;
