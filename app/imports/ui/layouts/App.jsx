import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import UserProfile from '../pages/UserProfile';
import UserConcert from '../pages/UserConcert';
import MyConcerts from '../pages/MyConcerts';
import UserHome from '../pages/UserHome';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import BrowseProfiles from '../pages/BrowseProfiles';
import ContactPage from '../pages/ContactPage';
import AdminHome from '../pages/AdminHome';
import EditProfile from '../pages/EditProfile';
import ListCommentsAdmin from '../pages/ListCommentsAdmin';
import BrowseConcerts from '../pages/BrowseConcerts';
import AdminBrowseProfiles from '../pages/AdminBrowseProfiles';
import CreateConcert from '../pages/CreateConcert';
import EditConcert from '../pages/EditConcert';
import AdminBrowseConcerts from '../pages/AdminBrowseConcerts';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<NotLoggedInRoute><Landing /></NotLoggedInRoute>} />
          <Route path="/signin" element={<NotLoggedInRoute><SignIn /></NotLoggedInRoute>} />
          <Route path="/signup" element={<NotLoggedInRoute><SignUp /></NotLoggedInRoute>} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/browse-all-profiles" element={<ProtectedRoute><BrowseProfiles /></ProtectedRoute>} />
          <Route path="/browse-all-concerts" element={<ProtectedRoute><BrowseConcerts /></ProtectedRoute>} />
          <Route path="/my-concerts" element={<ProtectedRoute><MyConcerts /></ProtectedRoute>} />
          <Route path="/userprofile/:userId" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/userhome" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
          <Route path="/userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/create-concert" element={<ProtectedRoute><CreateConcert /></ProtectedRoute>} />
          <Route path="/userconcert/:userId" element={<ProtectedRoute><UserConcert /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/edit-concert/:_id" element={<ProtectedRoute><EditConcert /></ProtectedRoute>} />
          <Route path="/adminhome" element={<AdminProtectedRoute ready={ready}><AdminHome /></AdminProtectedRoute>} />
          <Route path="/userprofile/:admin/:userId" element={<AdminProtectedRoute ready={ready}><UserProfile /></AdminProtectedRoute>} />
          <Route path="/userconcert/:admin/:userId" element={<AdminProtectedRoute ready={ready}><UserConcert /></AdminProtectedRoute>} />
          <Route path="/admin-browse-profiles" element={<AdminProtectedRoute ready={ready}><AdminBrowseProfiles /></AdminProtectedRoute>} />
          <Route path="/admin-browse-concerts" element={<AdminProtectedRoute ready={ready}><AdminBrowseConcerts /></AdminProtectedRoute>} />
          <Route path="/admin-comments" element={<AdminProtectedRoute ready={ready}><ListCommentsAdmin /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

/*
 * NotLoggedInRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to the requested page.
 * @param {any} { component: Component, ...rest }
 */
const NotLoggedInRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return !isLogged ? children : <Navigate to="/userhome" />;
};

// Require a component and location to be passed to each NotLoggedInRoute.
NotLoggedInRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

NotLoggedInRoute.defaultProps = {
  children: <Navigate to="/userhome" />,
};

export default App;
