import React, { Component } from "react";
import Try from "./TryClass";

function getNumbers() {
  // 숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const randomNumbers = [];
  for (let i = 0; i < 4; i += 1) {
    const randomNumber = candidates.splice(
      Math.floor(Math.random() * candidates.length),
      1
    )[0];
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    const { answer, value, tries } = this.state;
    e.preventDefault();
    if (value === answer.join("")) {
      this.setState((prevState) => {
        return {
          result: "홈런!",
          // react에서는 push 쓰면 안 됨.
          // push를 쓰면 react는 뭐가 바꼈는지 감지할 수 없음.
          tries: [
            // 기존 배열 복사하고
            ...prevState.tries,
            // 새로운 거 넣어주기
            { try: value, result: "홈런!" },
          ],
        };
      });
      alert("게임을 다시 시작합니다.");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      // 답 틀렸으면
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}`,
        });
        setTimeout(() => {
          alert("게임을 다시 시작합니다.");
          this.setState({
            value: "",
            answer: getNumbers(),
            tries: [],
            result: "",
          });
        }, 500);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: value,
                result: `${strike} 스트라이크 ${ball} 볼`,
              },
            ],
            value: "",
          };
        });
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도 :`} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
