import React from 'react';

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-secondary navbar-light">
          <ul className="navbar-nav">
              <li className="nav-item active">
              <a className="nav-link color-white" href="/">netgraph</a>
              </li>
          </ul>
      </nav>
    );
  }
}

export default Nav;