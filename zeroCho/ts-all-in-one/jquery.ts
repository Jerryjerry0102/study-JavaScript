interface zQuery<T> {
  text(
    param?:
      | string
      | number
      | boolean
      | ((this: T, index: number) => string | number | boolean)
  ): this;
  html(param: string | Element | Document | DocumentFragment): void;
}

const $tag: zQuery<HTMLElement> = $([
  "p",
  "t",
]) as unknown as zQuery<HTMLElement>;

$tag.text("hello");
$tag.text(123);
$tag.text(function (index) {
  console.log(this, index);
  return true;
});
$tag.text().html(document);

const tag = $("ul li").addClass(function (index) {
  return "item-" + index;
});

$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
