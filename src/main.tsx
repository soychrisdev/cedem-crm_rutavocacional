import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Casos, { loader as CasosLoader } from './routes/Casos'
import { QueryClient } from '@tanstack/react-query'
import Home from './routes/Home'
import Layout from './routes/Layout';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount) => failureCount > 3 ? true : false,
      staleTime: 1000 * 60 * 60 * 6, // 6 hours
      cacheTime: 1000 * 60 * 60 * 3, // 3 hours
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/casos',
        element: <Casos />,
        loader: CasosLoader(queryClient),
      }
    ]
  },



])
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)
