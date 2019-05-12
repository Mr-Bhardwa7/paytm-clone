import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Badge } from 'reactstrap';
import { connect } from 'react-redux';

//actions
import { userSignUp } from '../../../actions/UserAction';

class Register extends Component {
  constructor() {
    super();
    this.state = {
        displayErrors : false,
        displayErrorMessage : false
    }
  }

  _signUp = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
        this.setState({ displayErrors: true });
        return;
    }

    this.setState({ displayErrors: false });

    const data = new FormData(event.target);
    const user = {};
    const arr = this.props.users.users;
    const { length } = arr;
    user['id'] = length + 1
    user['verified'] = true
    user['isLoggedIn'] = false
    user['transaction'] = {
        wallet  : 0,
        sent    : 0,
        recieve : 0
    }
    
    for (var [key, value] of data.entries()) { 
        if(key === 'mobile_number')
            value = parseInt(value)

        user[key] = value
    }
    
    const found = arr.some(el => el.mobile_number === user.mobile_number);
    if (!found) {
        this.props.userSignUp(user);
        this.props.history.push('/login')
    } else {
        this.setState({
            displayErrorMessage : true
        }, () => {
            setTimeout(() => {
                this.setState({
                    displayErrorMessage : false
                })
            }, 2000)
        })
    }
    
  }

  render() {
    const { displayErrors, displayErrorMessage } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this._signUp} className={displayErrors ? 'displayErrors' : ''}>
                    <h1>Sign Up</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                          type="text" 
                          placeholder="Username" 
                          name="username"
                          required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-screen-smartphone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                          type="text" 
                          placeholder="Mobile Number" 
                          name="mobile_number"
                          required
                          pattern="\d+"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                           type="password" 
                           placeholder="Create Password" 
                           name="password" 
                           required
                       />
                    </InputGroup>
                     <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input 
                          type="text" 
                          placeholder="Email" 
                          name="email" 
                      />
                    </InputGroup>
                    <Button color="primary" block className="p-2">Create Account</Button>
                  </Form>
                </CardBody>
                {
                    displayErrorMessage ?
                        <Badge pill color="danger" className="m-4 p-2 animated fadeIn"> User Already Exist </Badge> : null 
                }
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="12">
                    	<p className="text-muted text-center">
                          	Already have an account?
                          	<Link to="/login">
	                        	<Button color="link" className="px-1"> Sign In!</Button>
	                      	</Link>
                      	</p>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = ({users}) => ({ users: users })

const mapDispatchToProps = (dispatch) => ({
  userSignUp : user => dispatch(userSignUp(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
