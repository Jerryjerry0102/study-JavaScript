import React, { PureComponent } from "react";

class Test extends PureComponent {
  state = {
    array: [],
  };

  onClick = () => {
    this.setState({
      array: [...this.state.array, 1],
    });
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
