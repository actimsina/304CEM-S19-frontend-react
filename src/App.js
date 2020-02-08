import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './components/Dashboard';
import NoMatch from './components/NoMatch';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/profile' component={UserProfile} />
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
