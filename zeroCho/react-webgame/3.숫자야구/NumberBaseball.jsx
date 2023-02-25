import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {
  // 숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = () => {};

  onChangeInput = () => {};

  fruits = [
    { fruit: "사과", taste: "맛있다" },
    { fruit: "감", taste: "별로다" },
    { fruit: "귤", taste: "시다" },
    { fruit: "복숭아", taste: "부드럽다" },
    { fruit: "포도", taste: "귀찮다" },
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.fruits.map((v, i) => {
            return <Try key={v.fruit} value={v} index={i} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
