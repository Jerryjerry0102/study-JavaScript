import Info from "./Info.js";
import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetail({ $page, initialState }) {
  this.$component = document.createElement("div");
  this.$component.className = "ProductDetail";
  $page.append(this.$component);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();

    info.setState(this.state);
    // selectedOptions.setState();
  };

  let info = null;
  // let selectedOptions = null;
  this.render = () => {
    if (!this.state) return;
    this.$component.innerHTML = `<img src=${this.state.imageUrl} />`;
    if (info) return;
    info = new Info({
      $target: this.$component,
      initialState: this.state,
    });
    // if (selectedOptions) return;
    // selectedOptions = new SelectedOptions({
    //   $target: this.$component,
    //   initialState: this.state,
    // });
  };

  this.render();
}

/*
  <div class="ProductDetail">
    <img
      src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
    />
    <div class="ProductDetail__info">
      <h2>커피잔</h2>
      <div class="ProductDetail__price">10,000원~</div>
      <select>
        <option>선택하세요.</option>
        <option>100개 번들</option>
        <option>1000개 번들(+5,000)</option>
      </select>
      <div class="ProductDetail__selectedOptions">
        <h3>선택된 상품</h3>
        <ul>
          <li>
            커피잔 100개 번들 10,000원
            <div><input type="number" value="10" />개</div>
          </li>
          <li>
            커피잔 1000개 번들 15,000원
            <div><input type="number" value="5" />개</div>
          </li>
        </ul>
        <div class="ProductDetail__totalPrice">175,000원</div>
        <button class="OrderButton">주문하기</button>
      </div>
    </div>
  </div>
*/
