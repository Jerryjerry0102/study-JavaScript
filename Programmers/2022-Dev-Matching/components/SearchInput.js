export default function SearchInput({ $target, initialState, onChange }) {
  this.state = {
    value: initialState,
  };

  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";
  // 이벤트 핸들러 구현
  this.$element.addEventListener("keyup", (e) => {
    const actionIgnoreKeys = [
      "Enter",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];
    if (!actionIgnoreKeys.includes(e.key)) onChange(e.target.value);
  });
  this.$element.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
    <input
    class="SearchInput__input"
    type="text"
    placeholder="프로그램 언어를 입력하세요."
    value="${this.state.value}"/>
  `;
  };

  this.render();
}
