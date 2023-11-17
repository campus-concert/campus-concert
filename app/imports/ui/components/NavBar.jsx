import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  // shouldNavigate works in tandem with targetRoute as there was a bug when calling setTargetRoute since the state update doesn't happen immediately.
  const [targetRoute, setTargetRoute] = useState('/');
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleBrandClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      setTargetRoute('/adminhome');
    } else if (Meteor.userId()) {
      setTargetRoute('/userhome');
    } else {
      setTargetRoute('/');
    }
    setShouldNavigate(true);
  };

  useEffect(() => {
    if (shouldNavigate) {
      document.getElementById('hidden-nav-link').click();
      setShouldNavigate(false);
    }
  }, [shouldNavigate, targetRoute]);

  return (
    <Navbar bg="light" expand="lg">
      <Container className="nav justify-content-start">
        <Image src="/images/logo-1.png" className="rounded float-start" width="60px" />
        <Navbar.Brand as={NavLink} onClick={handleBrandClick}>
          <h2>Campus Concerts</h2>
        </Navbar.Brand>
        <NavLink id="hidden-nav-link" to={targetRoute} style={{ display: 'none' }} />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="welcome-user-nav" as={NavLink} to="/userhome" key="view">User Home Page</Nav.Link>,
              <Nav.Link id="profile-stuff-nav" as={NavLink} to="/userprofile" key="user">View My Profile</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/browse-all-profiles" key="browse">Browse Profiles</Nav.Link>,
              <Nav.Link id="add-concert-nav" as={NavLink} to="/createconcert" key="add">Create Concert</Nav.Link>,
              <Nav.Link id="concert-stuff-nav" as={Nav.Link} to="/browse-all-concerts" key="concert">Browse Concerts</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="admin-home" as={NavLink} to="/adminhome" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default (NavBar);
