import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { DefaultHeader, DefaultFooter } from '../../containers'
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
} from '@coreui/react';

const Dashboard = React.lazy(() => import('./Dashboard'));


class DashboardContainer extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main p-4">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                  <Dashboard />
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter> 
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DashboardContainer;
