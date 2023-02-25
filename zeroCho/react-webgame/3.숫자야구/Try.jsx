import React, { Component } from "react";

class Try extends Component {
  render() {
    const { fruit, taste } = this.props.value;
    return (
      <>
        <li>
          <b>{fruit}</b> - {taste}
          <div>컨텐츠</div>
          <div>컨텐츠1</div>
          <div>컨텐츠2</div>
          <div>컨텐츠3</div>
        </li>
      </>
    );
  }
}

export default Try;
