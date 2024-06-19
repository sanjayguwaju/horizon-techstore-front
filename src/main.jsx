// Libraries
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

// Stylesheets
import "antd/dist/reset.css";
import './index.css';

// Local files
import App from './App';
import store from './store'; // import the store from the new file
import { theme } from './theme'; // import the theme from the new file

// Render the root component
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);