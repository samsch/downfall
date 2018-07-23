# Downfall

A library for inverting the flow of events in React. AKA, doing the wrong thing the right way.

- [npm package](https://www.npmjs.com/package/downfall)
- [Github repo](https://github.com/samsch/downfall)

## What it does

Downfall lets you push events into a stream, which will propagate down the React tree (via context), where they can be acted on by other React components.

```jsx
import { createStream, Downfall } from 'downfall';
const stream = createStream();

const Child = () => (
  <Downfall onEvent={event => console.log(event)} />
);

const App = () => (
  <Downfall stream={stream}>
    <Child />
  </Downfall>
);
stream.push('Event!');
// "Event!" will be logged by the onEvent handler.
```

Any given `onEvent` listener will be called for all events pushed from ancestor Downfall components.

## Why

Sometimes in React you have non-data events which need to flow down to children components. In 99.9% of cases, you should probably just make some state out of the events and pass state props down. For those .1% of cases where that just doesn't make sense though, you can use this library as a clean way for events to flow down.

## Usage

### Install

`npm i downfall`

### Getting an event stream

You can create an event injection stream using `createStream()`.

```js
import { createStream } from 'downfall';

const anEventStream = createStream();

anEventStream.push('click');
```

### Injecting the stream

You pass a stream into a Downfall component to inject the event stream into all child Downfalls.

```jsx
import { createStream, Downfall } from 'downfall';

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
```

### Listening to the stream

```jsx
import { Downfall } from 'downfall';

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

ReactDOM.render((
  <MyInjectingComponent>
    <MyListeningComponent />
  </MyInjectingComponent>
), element);
```

## Examples

- [Codesandbox demo of the above code](https://codesandbox.io/s/vq5mnowxl0).
- [Another example, showing nesting](https://codesandbox.io/s/q3jpy97jrw).

Alternatively, if you clone the repo (and install it's dependencies with `npm i`), these examples can be run with `npm run example-ticks` and `npm run example-click`. (They are in `/example` in the repo.)

## API details

`downfall` has two exports: `createStream` and `Downfall`.

### createStream

`createStream()` returns an object with a single public function property: `.push()`.

You can pass and call `push()` anywhere. It takes a single argument of any type. For simple cases, that might just be a string, or it could be actual Event objects, or even functions.

The object returned by `createStream()` should be passed to a `Downfall` component as the `stream` prop.

> The object returned by `createStream()` also has a `stream` property, which is a `Kefir.pool()` stream. This should be considered **unstable**, and not used in applications.

### Downfall

`Downfall` is a React component which takes these props:

Prop | type | description
- | - | -
onEvent | function | This event is called when any parent Downfall stream has something `push()`ed to it.
stream | createStream() return value | This stream will be with the parent stream, and any events from either will trigger `onEvent` calls for `Downfall` components lower in the tree.
children | Any valid React children | If using the `stream` prop, only `Downfall` components rendered in children (or children's children, etc) will get the `push()`ed events. If only using `onEvent`, using `children` is not necessary (but will be rendered normally if provided).
context | Kefir Observable | [**Unstable**] This is a backdoor to override the parent event stream. E.g., if you wanted only your `push()`ed events to be caught by children, you could do `context={Kefir.never()}` to override the parent stream.

## Stability and future changes

At the moment, the main API is stable, with some exposed implementation being technically unstable.

I would like to add a way to use specific React createContext instances, such that this could be used in other libraries without collision. I may do this by exposing a `Context` prop (note the current semi conflict in name) on `Downfall`, which would be the return object from createContext. Then you could create your own context and be wholly separate from any other usage of Downfall.

## License

You may use this code under the terms of the Free Public License, as outlined in LICENSE.md
