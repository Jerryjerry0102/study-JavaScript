const API_END_POINT =
  "https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products";

export const request = async (productId) => {
  try {
    const url = productId ? `${API_END_POINT}/${productId}` : API_END_POINT;
    const res = await fetch(url);
    if (res.ok) return res.json();
    throw new Error("API 통신 실패");
  } catch (err) {
    console.error(err.message);
  }
};
