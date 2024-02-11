import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import { store } from './store/store.js';
import Interested from './components/Interested.jsx';
import AlreadyRead from './components/AlreadyRead.jsx';
import Recommended from './components/Recommended.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,

      },
      {
        path: "/signup",
        element: <Signup />,
      },{
        path: "/books/interested",
        element: <Interested />,
      },
      {
        path: "/books/alreadyRead",
        element: <AlreadyRead />,
      },
      {
        path: "/books/recommendation",
        element: <Recommended />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)
