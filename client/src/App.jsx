import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { store, persistor } from './redux/store';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <ThemeProvider>
              <BrowserRouter>
                <Toaster position="top-right" />
                <AppRoutes />
              </BrowserRouter>
            </ThemeProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
