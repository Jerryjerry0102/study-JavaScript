export default function ProductList({ $page, initialState }) {
  this.$component = document.createElement("ul");
  this.$component.className = "ProductList";
  $page.append(this.$component);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$component.innerHTML = `
      <li class="Product">
        <img
          src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
        />
        <div class="Product__info">
          <div>커피잔</div>
          <div>10,000원~</div>
        </div>
      </li>
      <li class="Product">
        <img
          src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
        />
        <div class="Product__info">
          <div>커피잔</div>
          <div>10,000원~</div>
        </div>
      </li>
    `;
  };
}

/*
  <ul>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
  </ul>
*/
