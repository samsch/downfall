import React from 'react';
import PropTypes from 'prop-types';
import Kefir from 'kefir';
import memoize from 'memoize-one';

const singleValue = value => Kefir.stream(emitter => {
  emitter.emit(value);
  emitter.end();
});

export function createStream () {
  const stream = Kefir.pool();
  return {
    stream,
    push: value => stream.plug(singleValue(value)),
  };
}

const { Consumer, Provider } = React.createContext(Kefir.never());

function withDownfall (Component) {
  return function DownfallContext (props) {
    return (
      <Consumer>
        {stream => (
          <Component context={stream} {...props} />
        )}
      </Consumer>
    );
  };
}

function mergeStreams (contextStream, injectedStream) {
  return Kefir.merge([contextStream, injectedStream.stream]);
}

class DownfallInner extends React.Component {
  constructor (props) {
    super(props);
    this.makeOwnStream = memoize(mergeStreams);
  }
  componentDidMount () {
    if (this.props.onEvent) {
      this.subscription = this.props.context.observe({
        // We want to always call the current onEvent, so we use `this` here to get it, rather
        // than passing the function itself.
        value: value => this.props.onEvent(value),
      });
    }
  }
  componentDidUpdate (prevProps) {
    if (prevProps.context !== this.props.context) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      if (this.props.context) {
        this.subscription = this.props.context.observe({
          // We want to always call the current onEvent, so we use `this` here to get it, rather
          // than passing the function itself.
          value: value => this.props.onEvent(value),
        });
      }
    }
  }
  componentWillUnmount () {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  render () {
    if (this.props.stream) {
      return (
        <Provider value={this.makeOwnStream(this.props.context, this.props.stream)}>
          {this.props.children}
        </Provider>
      );
    }
    return this.props.children || null;
  }
}
const ObservableProp = PropTypes.shape({
  observe: PropTypes.func.isRequired,
});
DownfallInner.propTypes = {
  onEvent: PropTypes.func,
  stream: PropTypes.shape({
    stream: ObservableProp.isRequired,
    push: PropTypes.func.isRequired,
  }),
  context: ObservableProp.isRequired,
  children: PropTypes.node,
};

export const Downfall = withDownfall(DownfallInner);
