import React, { PureComponent } from "react";

class Try extends PureComponent {
  /* 함수를 사용하는 경우는 정밀한 동작이 필요할 때(constructor, ref함수, setState함수)
  constructor(props) {
    super(props);
    // 다른 동작
    const filtered = this.props.filter(() => {});
    this.state = {
      result: filtered,
      try: this.props.try,
    };
  }
  */
  state = {
    result: this.props.tryInfo.result,
    try: this.props.tryInfo.try,
  };
  onClick = () => {
    this.setState({
      result: "props와 state 연결 성공",
    });
  };
  render() {
    return (
      <li>
        <div>{this.state.try}</div>
        <div onClick={this.onClick}>{this.state.result}</div>
      </li>
    );
  }
}

export default Try;
