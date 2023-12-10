import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useLocation } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, MusicNote, Star } from 'react-bootstrap-icons';

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
          <Image src="/images/logo-1.png" className="rounded" width="55px" alt="Logo" />
          <span className="ms-2 h2 text-white">Campus Concert</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser ? (
              <>
                <Nav.Link
                  as={NavLink}
                  id="browse-profiles-nav"
                  to="/browse-all-profiles"
                  className="nav-link-margin"
                  style={{ borderBottom: isCurrentTab('/userprofile') && '2px solid #007bff', marginBottom: '-2px' }}
                >
                  Profiles
                </Nav.Link>
                <NavLink
                  id="browse-concerts-nav"
                  as={NavLink}
                  to="/browse-all-concerts"
                  className="nav-link-margin"
                  style={{ borderBottom: isCurrentTab('/userprofile') && '2px solid #007bff', marginBottom: '-2px' }}
                >
                  Concerts
                </NavLink>
                <NavLink
                  id="create-concert-nav"
                  as={NavLink}
                  to="/create-concert"
                  className="nav-link-margin"
                  style={{ borderBottom: isCurrentTab('/userprofile') && '2px solid #007bff', marginBottom: '-2px' }}
                >
                  Create concert
                </NavLink>
              </>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') && (
              <NavDropdown id="admin-dropdown-nav" title="Admin">
                <NavDropdown.Item
                  id="admin-home-nav"
                  as={NavLink}
                  to="/adminhome"
                >
                  Admin page
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="admin-browse-profiles-nav"
                  as={NavLink}
                  to="/admin-browse-profiles"
                >
                  Edit profiles
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="admin-browse-concerts-nav"
                  as={NavLink}
                  to="/admin-browse-concerts"
                >
                  Edit concerts
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="admin-comments-nav"
                  as={NavLink}
                  to="/admin-comments"
                >
                  View user comments
                </NavDropdown.Item>
              </NavDropdown>
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
                <NavDropdown.Item
                  as={NavLink}
                  id="user-profile-nav"
                  to="/userprofile"
                >
                  <PersonFill /> User profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="bookmarked-concerts-nav"
                  as={NavLink}
                  to="/bookmarked-concerts"
                >
                  <Star /> Bookmarks
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="my-concerts-nav"
                  as={NavLink}
                  to="/my-concerts"
                >
                  <MusicNote /> My concerts
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="navbar-sign-out"
                  as={NavLink}
                  to="/signout"
                >
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
