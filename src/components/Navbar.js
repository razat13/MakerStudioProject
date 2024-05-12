import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../src/store/store';

const Navbar = () => {
  const { searchQuery, setSearchQuery, cartItems } = useAppContext();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      <nav className="navbar bg-light fixed-top shadow" >
        <div className="container-fluid container">
          {isHomePage && (
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <img src="/search.svg" alt="logo" style={{ height: "20px" }} />
            </button>
          )}
          <NavLink to="/">
            <img src="/FakeShop.png" alt="logo" style={{ height: "50px" }} />
          </NavLink>
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <NavLink to="/">
                <img src="/FakeShop.png" alt="logo" style={{ height: "50px" }} />
              </NavLink>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <input
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Type to search..."
              />
            </div>
          </div>
          <NavLink to="/cart">
            <button className="btn btn-outline-dark ml-auto">Cart ({cartItems.length})</button>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
