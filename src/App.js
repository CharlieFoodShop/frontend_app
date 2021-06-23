import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Api from './pages/Api';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <Route path="/api" exact component={Api} />
      <Route path="/test" exact component={Test} />
    </Router>
  );
}

export default App;
