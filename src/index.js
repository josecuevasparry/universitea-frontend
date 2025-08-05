import { createRoot } from 'react-dom/client';
import App from './App';

// Create a root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render your app
root.render(
  <App />
);