import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import './index.css';

import App from './App.jsx';
import CreateTrip from './create-trip';
import ViewTrip from './view-trip/[tripId]';
import ContactUs from './components/ContactUs';
import MyTrips from './components/MyTrips';
import Header from './components/custom/Header';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: '/create-trip',
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    ),
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <>
        <Header />
        <ViewTrip />
      </>
    ),
  },
  {
    path: '/contact',
    element: (
      <>
        <Header />
        <ContactUs />
      </>
    ),
  },
  {
    path: '/my-trips',
    element: (
      <>
        <Header />
        <MyTrips />
      </>
    ),
  },
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </GoogleOAuthProvider>
  </StrictMode>
);

