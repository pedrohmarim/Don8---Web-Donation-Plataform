import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Socials from './Components/GlobalComp/socials';

import Logo from './assets/darkLogo.png'

const HomePageDonations = lazy(() => import('./Pages/HomePageDonations'))
const Login = lazy(() => import('./Pages/Login'));
const ViewPost = lazy(() => import('./Pages/viewPost'));
const Profile = lazy(() => import('./Pages/Profile'));
const Settings = lazy(() => import('./Pages/Settings'));
const newAdress = lazy(() => import('./Pages/addAdresses'));

const Routes = () => (
    <Router>
        <Suspense fallback={
            <div className="d-flex justify-content-center">
                <div className="centered">
                    <img src={Logo} alt="Logo" height="100" className="mb-4" />
                    <CircularProgress color="secondary" size={50} />
                </div>
            </div>
        }>
            <Switch>
                <Route exact path="/" component={HomePageDonations} />
                <Route path="/login" component={Login} />
                <Route path="/view/:postTitle/:id" component={ViewPost} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
                <Route path="/newAddress" component={newAdress} />
            </Switch>
            <Socials />
        </Suspense>
    </Router>
)

export default Routes;