import React, { useCallback } from 'react';
import './App.css';
import { Redirect, Route, Router, Switch, useHistory } from 'react-router-dom';
import { Home } from './layouts/pages/home/Home';
import { Header } from './layouts/utils/Header';
import { Footer } from './layouts/utils/Footer';
import { About } from './layouts/pages/about/About';
import { Pricing } from './layouts/pages/pricing/Pricing';
import { Doctors } from './layouts/pages/doctors/Doctors';
import { Contact } from './layouts/pages/contact/Contact';
import Login from './layouts/pages/loginAndRegister/Login';
import Register from './layouts/pages/loginAndRegister/Register';
import Profile from './layouts/pages/profile/Profile';

import authService from './services/auth.service';
import AuthVerify from './common/EventBus';
import ProtectedRoute from './layouts/utils/ProtectedRoute';
import Appointments from './layouts/pages/appointments/Appointments';
import Admin from './layouts/pages/admin/Admin';
import PrivateRoute from './layouts/utils/PrivateRoute';
import { Hub } from './layouts/pages/patients/Hub';

function App() {
  const isAuthenticated = authService.getCurrentUser()?.accessToken !== null;

  return (
    <div className='d-flex flex-column min-vh-100 main-bg-beige'>

      <Header />
      <div className='flex-grow-1 d-flex flex-column'>
        <Switch>
          <Route path={'/'} exact>
            <Redirect to={'/home'} />
          </Route>

          <Route path={'/home'}>
            <Home />
          </Route>

          <Route path={'/login'}>
            <Login />
          </Route>

          <Route path={'/register'}>
            <Register />
          </Route>

          <Route path={'/about-us'}>
            <About />
          </Route>

          <Route path={'/pricing'}>
            <Pricing />
          </Route>

          <Route path={'/doctors'}>
            <Doctors />
          </Route>

          <Route path={'/contact'}>
            <Contact />
          </Route>

          <PrivateRoute component={Profile} path={'/profile'}/>
          <PrivateRoute component={Appointments} path={'/appointments'} role='ROLE_USER'/>
          <PrivateRoute component={Admin} path={'/admin'} role='ROLE_ADMIN'/>
          <PrivateRoute component={Hub} path={'/hub'} role='ROLE_DOCTOR;ROLE_ADMIN'/>

          {/* <ProtectedRoute user={authService.getCurrentUser()} redirectPath='/home'>
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute user={authService.getCurrentUser()} redirectPath='/home'>
            <Appointments />
          </ProtectedRoute>

          <ProtectedRoute user={authService.getCurrentUser()} redirectPath='/home'>
            <Admin />
          </ProtectedRoute> */}

        </Switch>
      </div>

      <Footer />


    </div>
  );
}

export default App;
