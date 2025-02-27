import React from 'react';
import ReactDOM from 'react-dom/client';

import { DATA } from './data';
import App from './components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App data={DATA} />
  </React.StrictMode>
);
