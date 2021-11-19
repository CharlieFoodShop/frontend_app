import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import CustomerLogIn from './pages/customer_pages/CustomerLogIn';
import CustomerRegister from './pages/customer_pages/CustomerRegister';
import CustomerResetPassword from './pages/customer_pages/CustomerResetPassword';
import CustomerResetPasswordToken from './pages/customer_pages/CustomerResetPasswordToken';
import CustomerIndex from './pages/customer_pages/CustomerIndex';

import ManagerLogIn from './pages/manager_pages/ManagerLogIn'
import ManagerRegister from './pages/manager_pages/ManagerRegister';
import ManagerResetPassword from './pages/manager_pages/ManagerResetPassword';
import ManagerResetPasswordToken from './pages/manager_pages/ManagerResetPasswordToken';
import ManagerIndex from './pages/manager_pages/ManagerIndex';

import GlobalState from "./context/GlobalState";

function App() {
  return (
    <GlobalState>
      <Router>
        <Switch>
          <Route path="/customer/login" exact component={CustomerLogIn} />
          <Route path="/customer/register" exact component={CustomerRegister} />
          <Route path="/customer/reset-password/" exact component={CustomerResetPassword} />
          <Route path="/customer/reset-password/:token" exact component={CustomerResetPasswordToken} />
          <Route path="/customer/" component={CustomerIndex} />

          <Route path="/manager/login" exact component={ManagerLogIn} />
          <Route path="/manager/register" exact component={ManagerRegister} />
          <Route path="/manager/reset-password/" exact component={ManagerResetPassword} />
          <Route path="/manager/reset-password/:token" exact component={ManagerResetPasswordToken} />
          <Route path="/manager/" component={ManagerIndex} />

          <Redirect to="/customer/login" />
        </Switch>
      </Router>
    </GlobalState>
  );
}

export default App;
