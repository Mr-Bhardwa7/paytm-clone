import React, { Component } from "react";
import App from './App';
import Store from './helpers/Store';
import { Provider } from 'react-redux';

class Root extends Component {
  render() {
    return <Provider store={Store}>
    	<App />	
  	</Provider>
  }
}


export default Root;