const API_END_POINT =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

const request = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) return res.json();
    throw new Error(`${res.status}: ${res.statusText}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchNodes = (nodeId) => {
  const url = nodeId ? `${API_END_POINT}${nodeId}` : API_END_POINT;
  return request(url);
};
