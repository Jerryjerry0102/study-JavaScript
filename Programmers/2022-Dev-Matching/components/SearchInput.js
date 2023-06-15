export default function SearchInput({ $target, initialState, onChange }) {
  this.state = {
    value: initialState,
  };

  this.$element = document.createElement("div");
  this.$element.className = "SearchInput";
  // 이벤트 핸들러 구현
  this.$element.addEventListener("keyup", (e) => {
    onChange(e.target.value);
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
