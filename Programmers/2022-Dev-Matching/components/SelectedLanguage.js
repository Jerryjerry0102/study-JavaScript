const MAX_DISPLAY_COUNT = 5;
export default function SelectedLanguage({ $target, initialState }) {
  this.state = {
    selectedLanguages: initialState,
  };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    // 5개까지만 선택할 수 있게 하기
    if (this.state.selectedLanguages.length > MAX_DISPLAY_COUNT) {
      const startPosition =
        this.state.selectedLanguages.length - MAX_DISPLAY_COUNT;
      this.state.selectedLanguages = this.state.selectedLanguages.slice(
        startPosition,
        MAX_DISPLAY_COUNT + startPosition
      );
    }

    this.render();
  };

  this.$element = document.createElement("div");
  this.$element.className = "SelectedLanguage";

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <ul>
        ${this.state.selectedLanguages
          .map((selectedLanguage) => `<li>${selectedLanguage}</li>`)
          .join("")}
      </ul>
    `;
  };

  this.render();
}
