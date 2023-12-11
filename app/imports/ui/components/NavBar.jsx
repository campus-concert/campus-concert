import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, MusicNote, Star, PersonCircle, ChevronDown, PencilSquare, ChatLeftText, ShieldShaded, PlusCircle, People, MusicNoteBeamed, House } from 'react-bootstrap-icons';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from './LoadingSpinner';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const userEmail = Meteor.user()?.emails?.[0]?.address;
  const { ready, userProfile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userProf = userEmail ? Profiles.collection.findOne({ contact: userEmail }) : undefined;
    return {
      userProfile: userProf,
      ready: rdy,
    };
  });

  return ready ? (
    <Navbar id="navbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand id="home-nav" as={NavLink} to="/" className="d-flex align-items-center" style={{ marginRight: '50px' }}>
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
                  id="home-two-nav"
                  to="/"
                  className="nav-link-margin"
                  style={{ display: 'flex', alignItems: 'center', marginRight: '32px' }}
                >
                  <>
                    <House
                      style={{
                        width: '25px',
                        height: '25px',
                        marginRight: '8px',
                      }}
                    />
                    <span style={{ paddingRight: '6px' }}>Home</span>
                  </>
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  id="browse-profiles-nav"
                  to="/browse-all-profiles"
                  className="nav-link-margin"
                  style={{ display: 'flex', alignItems: 'center', marginRight: '32px' }}
                >
                  <>
                    <People
                      style={{
                        width: '25px',
                        height: '25px',
                        marginRight: '8px',
                      }}
                    />
                    <span style={{ paddingRight: '6px' }}>Profiles</span>
                  </>
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  id="browse-concerts-nav"
                  to="/browse-all-concerts"
                  className="nav-link-margin"
                  style={{ display: 'flex', alignItems: 'center', marginRight: '32px' }}
                >
                  <>
                    <MusicNoteBeamed
                      style={{
                        width: '25px',
                        height: '25px',
                        marginRight: '8px',
                      }}
                    />
                    <span style={{ paddingRight: '6px' }}>Concerts</span>
                  </>
                </Nav.Link>
              </>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') && (
              <NavDropdown
                id="admin-dropdown-nav"
                className="custom-dropdown"
                title={(
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '32px' }}>
                    <ShieldShaded style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                    <span style={{ paddingRight: '8px' }}>Admin</span>
                    <div style={{ marginLeft: 'auto', paddingRight: '4px' }}>
                      <ChevronDown />
                    </div>
                  </div>
                )}
              >
                <NavDropdown.Item
                  id="admin-home-nav"
                  as={NavLink}
                  to="/adminhome"
                >
                  <ShieldShaded /> Admin Home
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="admin-browse-profiles-nav"
                  as={NavLink}
                  to="/admin-browse-profiles"
                >
                  <PencilSquare /> Edit Profiles
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="admin-browse-concerts-nav"
                  as={NavLink}
                  to="/admin-browse-concerts"
                >
                  <PencilSquare /> Edit Concerts
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="admin-comments-nav"
                  as={NavLink}
                  to="/admin-comments"
                >
                  <ChatLeftText /> View User Comments
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav className="ms-auto">
            {currentUser ? (
              <Nav.Link
                as={NavLink}
                id="create-concert-nav"
                to="/create-concert"
                className="nav-link-margin"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <>
                  <PlusCircle
                    style={{
                      width: '25px',
                      height: '25px',
                      marginRight: '8px',
                    }}
                  />
                  <span style={{ paddingRight: '6px' }}>Create</span>
                </>
              </Nav.Link>
            ) : ''}
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
              <div className="custom-dropdown-container" style={{ paddingLeft: '18px', width: '230px' }}>
                <NavDropdown
                  id="navbar-current-user"
                  title={(
                    <div className="d-flex align-items-center">
                      {userProfile?.image && (
                        <img
                          src={userProfile.image}
                          alt="User"
                          style={{
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            marginRight: '8px',
                            border: '0.5px solid #ccc',
                          }}
                        />
                      )}
                      {userProfile?.firstName && userProfile?.lastName ? (
                        // <span style={{ paddingRight: '8px' }}>{`${userProfile.firstName} ${userProfile.lastName}`.length > 18 ? (
                        //   `${`${userProfile.firstName} ${userProfile.lastName}`.substring(0, 16)}...`
                        // ) : (
                        //   `${userProfile.firstName} ${userProfile.lastName}`
                        // )}
                        // </span>
                        <span style={{ paddingRight: '8px' }}>{currentUser}</span>
                      ) : (
                        <>
                          <PersonCircle
                            style={{
                              width: '30px',
                              height: '30px',
                              marginRight: '8px',
                            }}
                          />
                          <span style={{ paddingRight: '8px' }}>{currentUser}</span>
                        </>
                      )}
                      <div style={{ marginLeft: 'auto', paddingRight: '4px' }}>
                        <ChevronDown />
                      </div>
                    </div>
                  )}
                  className="custom-dropdown"
                  style={{ border: '1px solid #ccc', borderRadius: '25px' }}
                >
                  <NavDropdown.Item
                    as={NavLink}
                    id="user-profile-nav"
                    to="/userprofile"
                  >
                    <PersonFill /> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    id="my-concerts-nav"
                    as={NavLink}
                    to="/my-concerts"
                  >
                    <MusicNote /> My Concerts
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    id="bookmarked-concerts-nav"
                    as={NavLink}
                    to="/bookmarked-concerts"
                  >
                    <Star /> Bookmarks
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    id="navbar-sign-out"
                    as={NavLink}
                    to="/signout"
                  >
                    <BoxArrowRight /> Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <LoadingSpinner />
  );
};

export default NavBar;
