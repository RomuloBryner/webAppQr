import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Header } from './Components/Header';
import { Hero } from './Components/Hero';
import CamaraScan from './Components/CamaraScan';
import { FotoScan } from './Components/FotoScan';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "CamaraScan",
    element: <CamaraScan/>,
  },
  {
    path: "FotoScan",
    element: <FotoScan/>,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
