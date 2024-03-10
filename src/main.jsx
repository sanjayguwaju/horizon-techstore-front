import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import "antd/dist/reset.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/pages/reducers';
import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client

// Create Redux store 
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Render the root component
createRoot(document.getElementById('root')).render(
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
