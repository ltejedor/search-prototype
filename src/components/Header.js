import React from "react"

const Header = (props) => {
  return (
    <header className = "App-header">
      <h2><span>{props.title}: <span className="tagline">{props.tagline}</span></span></h2>
    </header>
  );
};

export default Header;
