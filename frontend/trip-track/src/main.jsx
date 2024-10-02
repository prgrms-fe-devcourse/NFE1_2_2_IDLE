import ReactDOM from 'react-dom/client'; // createRoot 사용을 위한 import
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot 사용

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
