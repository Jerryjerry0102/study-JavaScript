export default function Suggestion({ $target, initialState }) {
  this.state = { selectedIndex: 0, languages: initialState };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";

  $target.appendChild(this.$element);

  this.render = () => {
    const { selectedIndex, languages } = this.state;
    if (languages.length > 0) {
      this.$element.style.display = "block";
      this.$element.innerHTML = `<ul>
      ${languages
        .map(
          (language, index) =>
            `<li class="${
              index === selectedIndex ? "Suggestion__item--selected" : ""
            }">${language}</li>`
        )
        .join("")}
    </ul>`;
    } else {
      this.$element.style.display = "none";
      this.$element.innerHTML = "";
    }
  };

  this.render();

  window.addEventListener("keyup", (e) => {
    const { selectedIndex, languages } = this.state;
    if (languages.length > 0) {
      const lastIndex = languages.length - 1;
      let nextIndex = selectedIndex;

      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        if (e.key === "ArrowUp") {
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1;
        } else if (e.key === "ArrowDown") {
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1;
        }
        this.setState({ selectedIndex: nextIndex });
      }
    }
  });
}
