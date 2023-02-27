import React, { Component } from "react";

class Test extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  };

  render() {
    console.log("렌더링", this.state);
    return (
      <>
        <button onClick={this.onClick}>클릭</button>
      </>
    );
  }
}

export default Test;
