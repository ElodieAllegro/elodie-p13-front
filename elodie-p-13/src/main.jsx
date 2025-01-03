import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SignIn from './pages/SignIn/SignIn'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import User from './pages/User/User'
import './index.css'

import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="signIn" element={<SignIn />} />
      <Route path="user" element={<User />} />
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);



