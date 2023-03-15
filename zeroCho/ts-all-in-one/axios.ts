import axios, { Axios, AxiosError, AxiosResponse } from "axios";

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
  } catch (error) {
    // 네트워크 요청을 보낼 때는 에러가 날 가능성을 고려해야 한다.
    // 기본적으로 catch 문의 error는 unknown으로 되어 있다.
    // 어떤 에러가 날지는 에러가 나기 전까지는 모르기 때문(axios 에러가 아닐 수도 있다.)
    // 그럴 때 사용하는 방법이 as를 이용하거나 타입가드를 사용하는 것이다.

    /* as사용
    const errorResponse = (error as AxiosError).response;
    console.error(errorResponse?.data);
    errorResponse?.data;
    * response 뒤에 ?을 붙이는 건 response가 undefined일 상황을 방어하는 것
    * typseScript는 건망증이 심하기 때문에 변수에 저장해 두고 써야한다.
    */

    /* 타입 가드 사용
    if (error instanceof AxiosError) {
      error.response?.data
    }
    * AxiosError는 클래스 이기 때문에 아래 코드처럼 사용 가능
    */

    /* isAxiosError 사용 */
    if (axios.isAxiosError(error)) {
      // { message: '서버 장애입니다. 다시 시도해주세요.' }
      console.error(
        (error.response as AxiosResponse<{ message: string }>)?.data.message,
        (error as AxiosError<{ message: string }>).response?.data.message
      );
    }
  }
})();
