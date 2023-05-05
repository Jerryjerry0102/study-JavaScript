import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// import App from './layouts/App';
import App from '@layouts/App';
import { rootCertificates } from 'tls';

axios.defaults.withCredentials = true; // swr 관련 코드
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3090';

const container = document.getElementById('app');

const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
