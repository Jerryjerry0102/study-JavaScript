import App from '@layouts/App';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SWRDevtools from '@jjordy/swr-devtools';

// 프론트 서버 주소와 백엔드 서버 주소가 다를 경우 쿠키가 전달되지 않는다.
// (나는 지금 proxy로 프론트 서버 주소를 속이고 있기 때문에 쿠키 전달이 잘 됨.)
// 이 문제를 해결하기 위해서 아래 코드 추가
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3090';
console.log('env', process.env.NODE_ENV === 'production');

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {process.env.NODE_ENV === 'production' ? (
        <App />
      ) : (
        <SWRDevtools>
          <App />
        </SWRDevtools>
      )}
    </BrowserRouter>
  </React.StrictMode>,
);
