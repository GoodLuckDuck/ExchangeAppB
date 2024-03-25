import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div id="myLinks" className={isNavExpanded ? 'expanded' : ''}>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div>
        <h1 style={{ color: 'black', fontSize: '30px', paddingLeft: '500px', paddingRight: '400px', }}>Xchange</h1>
      </div>
      <div
        className={`collapse navbar-collapse ${isNavExpanded ? 'show' : ''}`}
      >
        <form className=" ml-auto" onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
