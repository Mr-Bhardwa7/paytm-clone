import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';
import { DefaultHeader, DefaultFooter } from '../../container'
import { connect } from 'react-redux';

import {
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
            <DefaultHeader {...this.props}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main p-4">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                  <Dashboard {...this.props} />
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


const mapStateToProps = ({users, transactions}) => ({ users: users, transactions : transactions })

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
