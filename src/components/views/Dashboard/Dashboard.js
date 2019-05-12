import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Badge
} from 'reactstrap';


class Dashboard extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      total_money_sent : 0,
      total_money_revieve : 0,
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentDidMount() {
    let id = parseInt(sessionStorage.getItem("user_id"));
    const users = this.props.users.users;
    let index = users.findIndex( value => value.id === id && value.isLoggedIn === true);
    let currentUser = users[index]
    this.setState({
      total_money_sent : currentUser.transaction.sent,
      total_money_revieve : currentUser.transaction.recieve,
    })
  }

  _transactionHistory = (option) => {
        let id = parseInt(sessionStorage.getItem("user_id"));
        const transactions = this.props.transactions.transactions
        var newArray = transactions.filter(function (el) {
            return  el.sender === id ||
                    el.reciever === id
        });
        
        if(option === 'getCount')
            return newArray.length

        return newArray.reverse()
  }

  render() {
    const { total_money_sent, total_money_revieve } = this.state
    let user_id = parseInt(sessionStorage.getItem("user_id"));
    let transactionHistory = this._transactionHistory()
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{total_money_sent}</div>
                <h5>Total Money Sent</h5>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value">{total_money_revieve}</div>
                <h5>Total Money Reveived</h5>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">{this._transactionHistory('getCount')}</div>
                <h5>Total No Of Transactions</h5>
              </CardBody>
              <div className="p-4" style={{ height: '70px' }}>
              		<Link to="/transactions">
	                	<Button color="dark" block>View transactions history</Button>
	             	</Link>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-dark">
              <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                  <i className="icon-location-pin"></i>
                </ButtonGroup>
                <h4>Recent Transactions</h4>
              </CardBody>
              <div className=" mx-3" style={{ height: '450px' }}>
              	<Row>
              		<Col md="12">
			            <ListGroup>
                            {
                                transactionHistory.slice(0, 5).map((transaction, index) => {
                                    return <ListGroupItem key={transaction.id.toString()} className="justify-content-between" color="light">
                                                {(transaction.sender === user_id) ? transaction.reciever_name : transaction.sender_name } <br /> 
                                                <small>{transaction.date}</small> 
                                                <Badge 
                                                    className="float-right pl-3 pr-3 py-2" 
                                                    pill 
                                                    color={(transaction.sender === user_id) ? 'primary' : 'success'}
                                                >
                                                    {transaction.amount}
                                                </Badge>
                                            </ListGroupItem>
                                })
                            }
		                </ListGroup>
			        </Col>
              	</Row>
              </div>
            </Card>
          </Col>
        </Row>
        

      </div>
    );
  }
}

const mapStateToProps = ({users, transactions}) => ({ users: users, transactions : transactions })

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
