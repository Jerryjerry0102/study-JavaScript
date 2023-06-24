export const CART_STORAGE_KEY = "CART_STORAGE";

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
