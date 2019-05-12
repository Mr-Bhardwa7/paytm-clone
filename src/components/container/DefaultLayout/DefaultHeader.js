import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem, Modal, ModalBody, ModalFooter, ModalHeader, Button, Form, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {  AppNavbarBrand } from '@coreui/react';
import logo from '../../../assets/img/brand/logo.png'

//actions
import { updateLoginStatus, addAmountToWallet } from '../../../actions/UserAction';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      displayErrors : false,
      username : '',
      userIndex : null
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentWillMount() {
    let id = parseInt(sessionStorage.getItem("user_id"));
    let users = this.props.users.users;
    let found = users.some(el => el.id === id && el.isLoggedIn === true);
      if (!found) {
           this.props.history.push('/login')
      } else {
        let index = users.findIndex( value => value.id === id && value.isLoggedIn === true);
        let currentUser = users[index]
        this.setState({
            username : currentUser.username,
            userIndex : index
        })
      }
  }

    signOut(e) {
      e.preventDefault()
      const users = this.props.users.users;
      let currentUser = users[this.state.userIndex]

      this.props.updateLoginStatus({
        'index'  : this.state.userIndex,
        'user'   : currentUser,
        'status' : false
      })
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("user_name");
      this.props.history.push('/login')
    }

    _addAmount = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({ displayErrors: true });
            return;
        }

        this.setState({ displayErrors: false });
        const data = new FormData(event.target);
        let amount;
        for (var [key, value] of data.entries()) { 
            if(key === 'amount')
                value = parseInt(value)

            amount = value
        }
        let id = parseInt(sessionStorage.getItem("user_id"));

        this.props.addAmountToWallet({
            'id' : id,
            'amount' : amount
        })
        this.toggle();
      
    }


  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { displayErrors, username, userIndex } = this.state
    let walletAmount = (this.props.users.users[userIndex] !== undefined) ? this.props.users.users[userIndex].transaction.wallet : 0
    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
        />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/dashboard" className="nav-link"><i className="icon-speedometer"></i> Dashboard</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link"><i className="fa fa-send-o"></i> Pay</Link>
          </NavItem>
          <NavItem className="px-3 mt-6">
            <NavLink to="#" onClick={this.toggle} className="nav-link"><Badge className="pl-3 pr-3 py-2" pill color="dark"> Wallet {' '} {walletAmount} </Badge></NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none px-3">
            <NavLink to="#" className="nav-link">Hello, {username}</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" onClick={e=>this.signOut(e)} className="nav-link"><i className="fa fa-lock"></i> Logout</NavLink>
          </NavItem>
        </Nav>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Add amount to wallet</ModalHeader>
          <Form noValidate onSubmit={this._addAmount} className={displayErrors ? 'displayErrors' : ''}>
          <ModalBody>
            <input 
              type="text"
              placeholder = "Enter amount"
              name="amount"
              required
              ref= {ref => {this.amount = ref}}
              pattern="\d+"
              className="form-control"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Add Amount</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;


const mapStateToProps = (users) => ({ users: users.users })

const mapDispatchToProps = (dispatch) => ({
  updateLoginStatus : status => dispatch(updateLoginStatus(status)),
  addAmountToWallet : amount => dispatch(addAmountToWallet(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader)
