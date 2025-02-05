import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip';
import ContactUs from "./components/ContactUs"
import Header from './components/custom/Header';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]';
import MyTrips from "./components/MyTrips"

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
    path: '/contact-us',
    element: (
      <>
        <Header />
        <ContactUs />
      </>
    ),
  },
  {
    path: '/my-trip',
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOGGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </GoogleOAuthProvider>
  </StrictMode>
);
