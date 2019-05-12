import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

    signOut(e) {
      e.preventDefault()
      //logout opration
    }


  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Money Sent</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Load Money</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none px-3">
            <NavLink to="#" className="nav-link">Hello, Animesh</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" onClick={e=>this.signOut(e)} className="nav-link"><i className="fa fa-lock"></i> Logout</NavLink>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
