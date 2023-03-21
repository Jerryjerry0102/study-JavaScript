import React, { FormEvent, MouseEvent, ChangeEvent, Component } from "react";

interface P {
  name: string;
  title: string;
}
interface S {
  word: string;
  value: string;
  result: string;
}

class WordRelay extends Component<P, S> {
  state = {
    word: "제로초",
    value: "",
    result: "",
  };

  onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = this.input;
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: "딩동댕",
        word: this.state.value,
        value: "",
      });
      if (input) {
        input.focus();
      }
    } else {
      this.setState({
        result: "땡",
        value: "",
      });
      if (input) {
        input.focus();
      }
    }
  };

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  };

  input: HTMLInputElement | null = null; // this.input을 생성

  onRefInput = (c: HTMLInputElement) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
