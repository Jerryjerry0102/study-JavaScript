export default function SearchInput({ $target, initialState }) {
  this.state = {
    value: initialState,
  };

  this.$element = document.createElement("div");
  this.$element.className = "SearchInput";

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
