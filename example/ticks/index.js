import React from 'react';
import ReactDOM from 'react-dom';
import { createStream, Downfall } from '../../src/downfall';
import './styles.css';
/* eslint-disable react/no-multi-comp */

class MyInjectingComponent extends React.Component {
  constructor (props) {
    super(props);
    this.stream = createStream();
    this.tick = () => {
      this.timeout = window.setTimeout(() => {
        this.stream.push('tick');
        this.tick();
      }, 500);
    };
  }
  componentDidMount () {
    this.tick();
  }
  componentWillUnmount () {
    window.clearTimeout(this.timeout);
  }
  render () {
    return (
      <Downfall stream={this.stream}>
        {this.props.children}
      </Downfall>
    );
  }
}

class MyListeningComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      ticks: 0,
    };
    this.onTick = event => {
      if (event === 'tick') {
        this.setState(state => ({ ticks: state.ticks + 1 }));
      }
    };
  }
  render () {
    return (
      <React.Fragment>
        <Downfall onEvent={this.onTick}/>
        <p>Number of ticks: {this.state.ticks}</p>
      </React.Fragment>
    );
  }
}


const rootElement = document.getElementById('root');
ReactDOM.render((
  <MyInjectingComponent>
    <MyListeningComponent />
  </MyInjectingComponent>
), rootElement);
