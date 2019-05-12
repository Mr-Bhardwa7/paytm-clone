import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './App.css';
import { connect } from 'react-redux';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Pages
const Login = React.lazy(() => import('./components/views/Login/Login'));
const Register = React.lazy(() => import('./components/views/Register/Register'));
const Dashboard = React.lazy(() => import('./components/views/Dashboard'));
const Users = React.lazy(() => import('./components/views/Users'));
const Transactions = React.lazy(() => import('./components/views/Transactions'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route  exact path="/" name="Login" component={Login} />
              <Route  path="/login" name="Login" component={Login} />
              <Route  path="/register" name="Register" component={Register} />
              <Route  path="/dashboard" name="Dashboard" component={Dashboard} />} />
              <Route  path="/users" name="Users" component={Users} />} />
              <Route  path="/transactions" name="Transactions" component={Transactions} />} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)

