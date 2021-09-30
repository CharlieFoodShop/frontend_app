import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import ManagerLogIn from './pages/manager_pages/ManagerLogIn'
import ManagerRegister from './pages/manager_pages/ManagerRegister';
import ManagerResetPassword from './pages/manager_pages/ManagerResetPassword';
import ManagerResetPasswordToken from './pages/manager_pages/ManagerResetPasswordToken';
import ManagerIndex from './pages/manager_pages/ManagerIndex';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/manager/login" exact component={ManagerLogIn} />
        <Route path="/manager/register" exact component={ManagerRegister} />
        <Route path="/manager/reset-password/" exact component={ManagerResetPassword} />
        <Route path="/manager/reset-password/:token" exact component={ManagerResetPasswordToken} />
        <Route path="/manager/" component={ManagerIndex} />
        <Redirect to="/manager/login" />
      </Switch>
    </Router>
  );
}

export default App;
