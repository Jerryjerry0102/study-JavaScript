const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

const link = document.querySelector("a");

const handleLoginFormSubmit = (event) => {
  event.preventDefault(); // 기본 동작을 막아준다.
  username = loginInput.value;
  console.log(username);
};

const handleLinkClick = (event) => {
  event.preventDefault();
  alert("click");
};

loginForm.addEventListener("submit", handleLoginFormSubmit);
link.addEventListener("click", handleLinkClick);
