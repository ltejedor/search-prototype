import React from "react"

const Header = (props) => {
  return (
    <header className = "App-header">
      <h2>{props.title}: <span>{props.tagline}</span></h2>
    </header>
  );
};

export default Header;
