// Libraries
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ConfigProvider } from 'antd';

// Stylesheets
import "antd/dist/reset.css";
import './index.css';

// Local files
import App from './App';
import rootReducer from '../src/pages/reducers';

// Create Redux store 
const store = configureStore({
  reducer: rootReducer
});

// Render the root component
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#2123bf',
        }
      }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
