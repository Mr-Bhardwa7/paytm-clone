import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Login = React.lazy(() => import('./views/Pages/Login/Login'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/',  name: 'Home' },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

export default routes;
