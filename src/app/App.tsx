import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../routes/AppRoutes';
import { store } from '../store/store';
import { AuthBootstrap } from './AuthBootstrap';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthBootstrap />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
