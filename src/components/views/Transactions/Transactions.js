import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';


function TransactionRow(props) {
  const transaction = props.transaction
  let user_id = parseInt(sessionStorage.getItem("user_id"));

  return (
    <tr key={transaction.id.toString()}>
      <th scope="row">{transaction.id}</th>
      <th>{transaction.sender_name}</th>
      <td>{transaction.reciever_name}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.date}</td>
      <td><Badge color={(transaction.sender === user_id) ? "primary" : "success"}>{(transaction.sender === user_id) ? "Paid" : "Recieved" }</Badge></td>
    </tr>
  )
}

class Transactions extends Component {

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
    let transactionHistory = this._transactionHistory()

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-google-wallet"></i> Transactions
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">sender name</th>
                      <th scope="col">reciever name</th>
                      <th scope="col">amount</th>
                      <th scope="col">date</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((transaction, index) =>
                      <TransactionRow key={index} transaction={transaction}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({transactions}) => ({ transactions: transactions })

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)