import React from 'react';
import { createStream, Downfall } from '../../src/downfall';

class MiddleSource extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      clickCount: 0,
    };
    this.middleStream = createStream();
    this.handleClick = () => this.middleStream.push('click');
    this.handleEvent = event => {
      if (event === 'click') {
        this.setState(state => ({ clickCount: state.clickCount + 1 }));
      }
    };
    this.middleSourceRenderCount = 0;
  }
  render () {
    return (
      <div>
        <p>MiddleSource Render Count: {++this.middleSourceRenderCount}</p>
        <p>MiddleSource Click Event Count: {this.state.clickCount}</p>
        <p>
          <button type="button" onClick={this.handleClick} >
            MiddleSource Click
          </button>
        </p>
        <Downfall stream={this.middleStream} onEvent={this.handleEvent} >
          {this.props.children}
        </Downfall>
      </div>
    );
  }
}
export default MiddleSource;
