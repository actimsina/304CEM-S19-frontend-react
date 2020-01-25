import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './components/Dashboard';
import NoMatch from './components/NoMatch';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>

    </Container>
  );
}

export default App;
