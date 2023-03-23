import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";

const loginAction = { type: "LOGIN" };

// redux는 상태관리
// redux는 상태를 바꿔주는 역할을 한다.
const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  posts: [],
};

// reducer는 상태를 바꾸는 규칙
// redux는 상태가 있고 상태를 바꾸려면 action을 dispatch해야 한다.
// action을 dispatch하면 reducer에 적어둔 규칙에 따라 state를 바꿔준다.
const reducer = combineReducers({
  user: (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          isLoggingIn: false,
          data: {
            nickname: "zerocho",
            password: "1234",
          },
        };
      default:
        return state;
    }
  },
  posts: (state, action) => {
    switch (action.type) {
      case "ADD_POST":
        return [...state, action.data];
      default:
        return state;
    }
    return state;
  },
});

// 상태를 store라는 개념에 담아둔다.
const store = createStore(reducer, initialState);
// null 자리는 reducer 자리

store.dispatch({
  type: "LOGIN",
  data: { nickname: "zerocho", password: "1234" },
});
console.log(store.getState());
// const nextState = {
//   user: {
//     isLoggingIn: true,
//     data: { nickname: "zerocho", password: "1234" },
//   },
//   posts: [],
// };
store.dispatch({
  type: "ADD_POST",
  data: { title: "hello", content: "redux" },
});
console.log(store.getState());
// const nextState = {
//   user: {
//     isLoggingIn: true,
//     data: { nickname: "zerocho", password: "1234" },
//   },
//   posts: [{ title: "hello", content: "redux" }],
// };
