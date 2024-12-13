
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <aside className="col-12 col-md-3 col-lg-2 d-md-block fixed-left">
      <Navbar className="navbar navbar-expand-md fixed-left justify-content-between" id="sidebar">
        <div className="container flex-column align-items-start">
          <Navbar.Brand href="index.html">
            <img src="assets/logo.png" alt="Spotify Logo" width="131" height="40" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="navbar-nav">
              <ul>
                <li><a href="#" className="nav-item nav-link">🏠 Home</a></li>
                <li><a href="#" className="nav-item nav-link">📚 Your Library</a></li>
                <li>
                  <div className="input-group mt-3">
                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary btn-sm h-100">GO</button>
                    </div>
                  </div>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className="nav-btn">
          <Button className="signup-btn">Sign Up</Button>
          <Button className="login-btn">Login</Button>
          <div>
          <a href="#">Cookie Policy</a> | <a href="#">Privacy</a>
          </div>
        </div>
      </Navbar>
    </aside>
  );
};

export default Sidebar;