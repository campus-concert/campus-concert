import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useLocation } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const location = useLocation();

  const isCurrentTab = (path) => location.pathname === path;

  return (
    <Navbar id="navbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand id="home-nav" as={NavLink} to="/" className="d-flex align-items-center">
          <Image src="/images/logo-1.png" className="rounded" width="60px" alt="Logo" />
          <span className="ms-2 h2 text-dark">Campus Concerts</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser ? (
              <>
                <Nav.Link
                  as={NavLink}
                  id="user-profile-nav"
                  to="/userprofile"
                  className="nav-link-margin"
                  style={{ borderBottom: isCurrentTab('/userprofile') && '2px solid #007bff', marginBottom: '-2px' }}
                >
                  My Profile
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  id="my-concerts-nav"
                  to="/my-concerts"
                  className="nav-link-margin"
                  style={{ borderBottom: isCurrentTab('/my-concerts') && '2px solid #007bff', marginBottom: '-2px' }}
                >
                  My Concerts
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  id="add-concert-nav"
                  to="/create-concert"
                  className="nav-link-margin"
                  style={{ borderBottom: isCurrentTab('/create-concert') && '2px solid #007bff', marginBottom: '-2px' }}
                >
                  Create Concert
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  id="browse-profiles-nav"
                  to="/browse-all-profiles"
                  className="nav-link-margin"
                  style={{ borderBottom: isCurrentTab('/browse-all-profiles') && '2px solid #007bff', marginBottom: '-2px' }}
                >
                  Browse Profiles
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  id="browse-concerts-nav"
                  to="/browse-all-concerts"
                  className="nav-link-margin"
                  style={{ borderBottom: isCurrentTab('/browse-all-concerts') && '2px solid #007bff', marginBottom: '-2px' }}
                >
                  Browse Concerts
                </Nav.Link>
              </>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') && (
              <Nav.Link
                as={NavLink}
                id="admin-home"
                to="/adminhome"
                className="nav-link-margin"
                style={{ borderBottom: isCurrentTab('/adminhome') && '2px solid #007bff', marginBottom: '-2px' }}
              >
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill /> Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight /> Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
