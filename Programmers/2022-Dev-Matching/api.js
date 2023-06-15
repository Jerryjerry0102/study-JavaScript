const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  const res = await fetch(url);
  try {
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    else return json;
  } catch (err) {
    console.error(err);
  }
};

export default function fetchLanguages(keyword) {
  return request(`${API_END_POINT}/languages?keyword=${keyword}`);
}
