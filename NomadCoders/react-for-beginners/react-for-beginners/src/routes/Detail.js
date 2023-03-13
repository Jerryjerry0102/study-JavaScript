import { useEffect } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  // useParams는 url에 있는 값(특히 변경되는 값)을 반환해주는 함수이다.
  const { id } = useParams();
  console.log(id);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return <h1>Detail</h1>;
}
export default Detail;
