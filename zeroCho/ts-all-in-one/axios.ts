import axios, { AxiosResponse } from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Created {}
interface Data {
  title: string;
  body: string;
  userId: number;
}
(async () => {
  try {
    // get은 서버로부터 데이터를 가져올 때 많이 씀
    const response = await axios.get<Post, AxiosResponse<Post>>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    // post는 서버에 새로운 데이터를 생성할 때 많이 씀
    // 안 쓸 데이터의 타입을 굳이 왜 받고 있을까?
    // 실제로 쓰이는 곳은 없넹ㅎㅎ 그냥 타입 검사용
    const response2 = await axios.post<Created, AxiosResponse<Created>, Data>(
      "https://jsonplaceholder.typicode.com/posts/1",
      { title: "foo", body: "bar", userId: 1 }
    );
    // axios는 사용방법이 여러가지가 있는데
    // 아래 방법처럼 post 요청을 보낼 수도 있다.
    const response3 = await axios({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
    // 이렇게 쓸 수도 있음.
    const response4 = await axios(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "post",
        data: {
          title: "foo",
          body: "bar",
          userId: 1,
        },
      }
    );
  } catch (error) {}
})();
