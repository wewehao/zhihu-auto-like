import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './index';

// 插件popup页
// 仅仅用作登陆,登陆后点击则触发background录制功能
ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
);
