import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import LoaderComponent from './components/LoaderComponent';
import store from './redux/store';

const LazyCart = React.lazy(() => import('./pages/Cart'));
const LazyNotFound = React.lazy(() => import('./pages/NotFound'));
const LazyFullPizza = React.lazy(() => import('./components/FullPizza'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <Suspense fallback={<LoaderComponent />}>
        <LazyNotFound />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <LazyCart />
          </Suspense>
        ),
      },
      {
        path: '/pizza/:id',
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <LazyFullPizza />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <LazyNotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
}
