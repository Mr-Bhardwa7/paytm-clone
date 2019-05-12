import React, { Component, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

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

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <h5>Money Sent</h5>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <h5>Money Reveived</h5>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <h5>Total No Of Transactions</h5>
              </CardBody>
              <div className="p-4" style={{ height: '70px' }}>
              		<Link to="#">
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
		                  <ListGroupItem className="justify-content-between" color="light">Aadesh <br /> <span>21-01-2012</span> <Badge className="float-right pl-3 pr-3 py-2" pill color="primary">1400</Badge></ListGroupItem>
		                  <ListGroupItem className="justify-content-between" color="light">Suraj <br /> <span>21-01-2012</span><Badge className="float-right pl-3 pr-3 py-2" pill color="success">200</Badge></ListGroupItem>
		                  <ListGroupItem className="justify-content-between" color="light">Priya <br /> <span>21-01-2012</span> <Badge className="float-right pl-3 pr-3 py-2" pill color="primary">100</Badge></ListGroupItem>
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

export default Dashboard;
