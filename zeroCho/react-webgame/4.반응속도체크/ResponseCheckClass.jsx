import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "ready",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeout;
  startTime;

  onClickScreen = () => {
    const { state } = this.state;
    if (state === "ready") {
      this.setState({
        state: "set",
        message: "초록색이 되면 클릭하세요.",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "go",
          message: "지금 클릭하세요.",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤
    } else if (state === "set") {
      clearTimeout(this.timeout);
      this.setState({
        state: "ready",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요.",
      });
    } else if (state === "go") {
      const endTime = new Date();
      console.log(this.startTime, endTime);
      this.setState((prevState) => {
        return {
          state: "ready",
          message: "클릭해서 시작하세요.",
          result: [...prevState.result, endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
