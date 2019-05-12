import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardGroup, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Badge } from 'reactstrap';

//actions
import { updateLoginStatus } from '../../../actions/UserAction';

class Login extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			loginCardCss : 'p-4',
			displayErrors : false,
			displayErrorMessage : false
		}
	}

	componentDidMount() {
	    window.addEventListener("resize", this.updateClass.bind(this));
	}

	updateClass = () => {
	    if (window.innerWidth <= 1024) {
	        this.setState({loginCardCss: 'mx-4'});
	    } else {
	        this.setState({loginCardCss: 'p-4'});
	    }
	}

	_login = (event) => {
		event.preventDefault();

	    if (!event.target.checkValidity()) {
	        this.setState({ displayErrors: true });
	        return;
	    }

	    this.setState({ displayErrors: false });

	    const data = new FormData(event.target);
	    const user = {};
	    const arr = this.props.users.users;

	    for (var [key, value] of data.entries()) { 
	        if(key === 'mobile_number')
	            value = parseInt(value)

	        user[key] = value
	    }

	    const found = arr.some(el => el.mobile_number === user.mobile_number && el.password === user.password);
	    if (found) {
		    let index = arr.findIndex( value => value.mobile_number === user.mobile_number && value.password === user.password );
	        let id = arr[index].id
	        let currentUser = arr[index]

	        this.props.updateLoginStatus({
	        	'index'  : index,
	        	'user'   : currentUser,
	        	'status' : true
	        })
	        sessionStorage.setItem("user_id", id);
	        sessionStorage.setItem("user_name", currentUser.username);
	        this.props.history.push('/dashboard')
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
	    const { loginCardCss, displayErrors, displayErrorMessage } = this.state;
		return (
	      <div className="app flex-row align-items-center">
	        <Container>
	          <Row className="justify-content-center">
	            <Col md="8">
	              <CardGroup>
	                <Card className={loginCardCss}>
		                  <CardBody>
		                    <Form noValidate onSubmit={this._login} className={displayErrors ? 'displayErrors' : ''}>
		                      <h1>Login</h1>
		                      <p className="text-muted">Sign In to your account</p>
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
		                      <InputGroup className="mb-4">
		                        <InputGroupAddon addonType="prepend">
		                          <InputGroupText>
		                            <i className="icon-lock"></i>
		                          </InputGroupText>
		                        </InputGroupAddon>
		                        <Input 
		                             type="password" 
		                             placeholder="Enter Password" 
		                             name="password" 
		                             required
		                         />
		                      </InputGroup>
		                      <Row>
		                        <Col xs="4">
		                          <Button color="primary" className="px-4">Login</Button>
		                        </Col>
		                        <Col xs="8" className="text-right">
		                          <Button color="link" onClick={{}} className="px-0">Forgot password?</Button>
		                        </Col>
		                      </Row>
		                    </Form>
		                  </CardBody>
				            {
				            	displayErrorMessage ?
				            		<Badge pill color="danger" className="my-1 p-2 animated fadeIn"> User Not Found </Badge> : null 
				            }
		                  <CardFooter className="p-4 d-md-block d-lg-none">
			                  	<Row>
			                        <Col xs="12">
				                        <p className="text-muted text-center">
				                          	Don't have an account?
				                          	<Link to="/register">
					                        	<Button color="link" className="px-1"> Register Now!</Button>
					                      	</Link>
				                      	</p>
			                        </Col>
		                        </Row>
	                    </CardFooter>
	                </Card>
	                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
	                  <CardBody className="text-center">
	                    <div>
	                      <h2>Sign up</h2>
	                      <p>Don't have an account, well thats not a problem. Register now and check this out paytm clone project.<br /> <strong>Advice : Never reload the webpage ;) </strong></p>
	                      <Link to="/register">
	                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
	                      </Link>
	                    </div>
	                  </CardBody>
	                </Card>
	              </CardGroup>
	            </Col>
	          </Row>
	        </Container>
	      </div>
	    );
	}
}

const mapStateToProps = ({users}) => ({ users: users })

const mapDispatchToProps = (dispatch) => ({
	updateLoginStatus : status => dispatch(updateLoginStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)