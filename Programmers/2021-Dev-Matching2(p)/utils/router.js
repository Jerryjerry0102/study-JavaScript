const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE";

export const initRoute = (checkRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    checkRoute();
  });
};

export const changeRoute = (url) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT));
};
