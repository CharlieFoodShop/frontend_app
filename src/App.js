import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import ManagerLogIn from './pages/manager_pages/ManagerLogIn'

function App() {
  return (
    <Router>
      <Route path="/manager/" exact component={ManagerLogIn} />
      <Redirect to="/manager/" />
    </Router>
  );
}

export default App;
