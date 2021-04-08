import React from "react";
import "./Square.css";

function Square(props) {
  console.log(props.current === true);
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={
        props.current === true
          ? { border: "3px solid black" }
          : { border: "1px solid #999" }
      }
    >
      {props.value}
    </button>
  );
}

export default Square;
