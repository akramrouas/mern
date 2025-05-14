import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import { Provider } from 'react-redux';
import store from '../store.js';
import Profile from '../pages/profile.jsx';
import PrivateRoute from '../components/privateRoute.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
<Route path="/" element={<App />}>
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='' element={<PrivateRoute/>} >
      <Route path='/profile' element={<Profile />} />

      </Route>



    </Route>  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
  </Provider>
)
