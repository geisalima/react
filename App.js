import React, { Component } from 'react';
import { InternalNav } from './routes';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <InternalNav />;
  }
  
}
