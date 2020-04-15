import React from "react";
import Select from "react-select";
import propTypes from "prop-types";

export const dropdownStyles = {
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  control: (provided) => ({
    ...provided,
    border: "1px solid #ECEDED",
    borderRadius: "8px",
    "> div:first-of-type": {
      padding: "4px 16px",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0 16px 0 0",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "0px 0px 20px rgba(0, 75, 80, 0.07)",
    zIndex: "5",
  }),
  option: (provided) => ({
    ...provided,
    color: "#373D43",
    fontWeight: "400",
    padding: "8px 16px",
    background: "none",
    zIndex: "10",
    "&:hover": {
      background: "none",
      color: "#0095a0",
      cursor: "pointer",
    },
    "&:first-of-type": {
      padding: "12px 16px 8px 16px",
    },
    "&:last-of-type": {
      padding: "8px 16px 12px 16px",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontWeight: "400",
    fontSize: "14px",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontWeight: "400",
  }),
  valueContainer: (provided) => ({
    ...provided,
  }),
};

export const primaryTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#4CB5BD",
  },
});

export const Dropdown = ({
  selectedItem,
  handleSelectChange,
  SelectValues,
}) => {
  return (
    <Select
      className="form-category"
      classNamePrefix="form-dropdown"
      styles={dropdownStyles}
      value={selectedItem}
      placeholder="--"
      onChange={handleSelectChange}
      options={SelectValues}
      theme={primaryTheme}
    />
  );
};

Dropdown.propTypes = {
  selectedItem: propTypes.object,
  handleSelectChange: propTypes.func.isRequired,
  SelectValues: propTypes.array.isRequired,
};

export default Dropdown;
