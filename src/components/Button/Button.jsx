import React from "react";
import propTypes from "prop-types";
import "./Button.scss";

const Button = ({ title, onClick, ...rest }) => {
  return (
    <button styleName="button" onClick={onClick} {...rest}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Button;
