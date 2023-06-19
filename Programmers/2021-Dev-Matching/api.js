const API_END_POINT =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

const request = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    }
    throw new Error("http 오류");
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchNodes = async (nodeId) =>
  await request(`${API_END_POINT}/${nodeId ? nodeId : ""}`);
