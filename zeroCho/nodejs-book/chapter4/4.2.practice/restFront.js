const getUser = async () => {
  try {
    const res = await axios.get("/users");
    const users = res.data;
    const list = document.getElementById("list");
    list.innerHTML = "";
    Object.keys(users).map((key) => {
      const div = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = users[key];

      const editButton = document.createElement("button");
      editButton.textContent = "수정";
      editButton.addEventListener("click", async () => {
        const name = prompt("바꿀 이름을 입력하세요");
        if (!name) {
          return alert("이름을 반드시 입력하셔야 합니다");
        }
        try {
          await axios.put("/user/" + key, { name });
          getUser();
        } catch (err) {
          console.error(err);
        }
      });

      const removeButton = document.createElement("button");
      removeButton.textContent = "삭제";
      removeButton.addEventListener("click", async () => {
        try {
          await axios.delete("/user/" + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });

      div.append(span, editButton, removeButton);
      list.append(div);
      console.log(res.data);
    });
  } catch (err) {
    console.error(err);
  }
};

window.onload = getUser;

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert("이름을 입력하세요");
  }
  try {
    await axios.post("/user", { name });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = "";
});
