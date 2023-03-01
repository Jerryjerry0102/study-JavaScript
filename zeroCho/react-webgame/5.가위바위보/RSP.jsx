import React, { Component } from "react";
/** 클래스의 경우
 * constructor -> render -> ref -> componentDidmount
 * -> (setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
 * (부모가 나를 없앨 때) -> componentWillUnmount -> 소멸
 */

const rspCoords = {
  rock: "0",
  scissor: "-142",
  paper: "-284",
};
const scores = {
  rock: 1,
  scissor: 0,
  paper: -1,
};

class RSP extends Component {
  state = {
    result: "",
    imgCoord: "0",
    score: 0,
  };

  interval;

  componentDidMount() {
    // 컴포넌트가 첫 렌더링된 후, 비동기 요청을 많이 함
    // const { imgCoord } = this.state; -> 이렇게 하면 클로저 발생!!
    this.interval = setInterval(() => {
      const { imgCoord } = this.state; // 안에 넣어줘야 함
      if (imgCoord === rspCoords.rock) {
        this.setState({
          imgCoord: rspCoords.scissor,
        });
      } else if (imgCoord === rspCoords.scissor) {
        this.setState({
          imgCoord: rspCoords.paper,
        });
      } else if (imgCoord === rspCoords.paper) {
        this.setState({
          imgCoord: rspCoords.rock,
        });
      }
    }, 1000);
  }

  componentDidUpdate() {
    // 리렌더링 후
  }

  componentWillUnmount() {
    // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
    clearInterval(this.interval);
  }

  onClickBtn = (choice) => {};

  render() {
    const { result, imgCoord, score } = this.state;

    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord}px 0`,
          }}
        ></div>
        <div>
          <button
            id="rock"
            className="btn"
            onClick={() => this.onClickBtn("rock")}
          >
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={() => this.onClickBtn("scissor")}
          >
            가위
          </button>
          <button
            id="paper"
            className="btn"
            onClick={() => this.onClickBtn("paper")}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;
