import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Modal, ModalBody, ModalFooter, ModalHeader, Form, Badge } from 'reactstrap';
import { connect } from 'react-redux';

//actions
import { updateWalletAfterTransaction } from '../../../actions/UserAction';
import { addTransactionHistory } from '../../../actions/TransactionAction';

function UserRow(props) {
  const user = props.user
  const id = parseInt(sessionStorage.getItem("user_id"));

  return (
    <tr key={user.id.toString()}>
      <th scope="row">{user.id}</th>
      <td>{user.username}</td>
      <td>{user.mobile_number}</td>
      <td>{(user.email !== '') ? user.email : '--' }</td>
      <td>{(user.id !== id) ? <Button onClick={props.payTo.bind(this, user)} className="btn-pill btn btn-dark btn-block active">PAY</Button> : '' }</td>
    </tr>
  )
}

class Users extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			modal : false,
			displayErrors : false,
			user : null,
			requiredAmount : 0
		}
	}

	toggle = () => {
	    this.setState({
	      modal: !this.state.modal,
	    });
	  }

	  payTo = (user) => {
	  	this.setState({
	  		user : user
	  	}, () => this.toggle())
	  }

	  _checkAvilableAmount = (event) => {
	  		event.preventDefault();
	  		const users = this.props.users.users;
		  	const id = parseInt(sessionStorage.getItem("user_id"));
	  		let index = users.findIndex( value => value.id === id && value.isLoggedIn === true);
	        let currentUser = users[index]
	  		let walletAmount = currentUser.transaction.wallet
	  		
	  		if(walletAmount < event.target.value)
	  		{
	  			this.setState({
	  				requiredAmount : (event.target.value - walletAmount)
	  			})
	  		} else {
	  			this.setState({requiredAmount : 0})
	  		}

	  }

	 _payMoney = (event) => {
	 	event.preventDefault();

	    if (!event.target.checkValidity()) {
	        this.setState({ displayErrors: true });
	        return;
	    }

	    this.setState({ displayErrors: false });

	    if(this.state.requiredAmount !== 0)
	    	return;

	    const data = new FormData(event.target);
	    const transaction = {};
	    var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;
	    transaction['id'] = Number(today.getTime());

	    for (var [key, value] of data.entries()) {
	    	if(key === 'sender_name' || key === 'reciever_name')
	    	{
	    		transaction[key] = value
	    	} else {
		        transaction[key] = parseInt(value)
	    	}

	    }

	    transaction['date'] = dateTime;
	    this.toggle();

	    this.props.addTransactionHistory(transaction);
	    this.props.updateWalletAfterTransaction({
	    	'sender_id'   : transaction.sender,
	    	'reciever_id' : transaction.reciever,
	    	'amount'	  : transaction.amount
	    })
	  }

  render() {

    const userList = this.props.users.users 
    const { displayErrors, requiredAmount } = this.state
  	const id = parseInt(sessionStorage.getItem("user_id"));
  	const user_name = sessionStorage.getItem("user_name");
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> Users
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">mobile number</th>
                      <th scope="col">email</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user} payTo={this.payTo}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Money Payment</ModalHeader>
          <Form noValidate onSubmit={this._payMoney} className={displayErrors ? 'displayErrors' : ''}>
          <ModalBody>
            <Row>
	          <Col md="12">
	            <Card className="text-black bg-light">
	              <CardBody className="pb-0">
	                <div className="text-value">{(this.state.user !== null ) ? this.state.user.username : ''}</div>
	                <small>{(this.state.user !== null) ? this.state.user.mobile_number : ''}</small>
	              </CardBody>
	            </Card>
	          </Col>
          	</Row>
          	<input type="hidden" name="sender" value={id} />
          	<input type="hidden" name="sender_name" value={user_name} />
          	<input type="hidden" name="reciever" value={(this.state.user !== null) ? this.state.user.id : null} />
          	<input type="hidden" name="reciever_name" value={(this.state.user !== null ) ? this.state.user.username : ''} />
            <input 
              type="text"
              placeholder = "Enter amount"
              name="amount"
              required
              pattern="\d+"
              className="form-control"
              onKeyUp = {this._checkAvilableAmount}
            />
            {
            	(requiredAmount !== 0 ) ?
            		<Badge pill color="danger" className="my-1"> Insufficient Wallet Balance, Add <i className="fa fa-inr"></i> {requiredAmount} </Badge> : null 
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className={(requiredAmount !== 0 ) ? "disabled" : null} >Make Payment</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({users}) => ({ users: users })

const mapDispatchToProps = (dispatch) => ({
	addTransactionHistory : history => dispatch(addTransactionHistory(history)),
	updateWalletAfterTransaction : data => dispatch(updateWalletAfterTransaction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)