import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { NewRoute } from './pages/routes/newRoute';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { NewPlace } from './pages/places/newPlace';
import { Calendar } from './pages/calendar';
import { Layout } from './components/Layout';
import { PlacesList } from './pages/places/placesList';
import { RoutesList } from './pages/routes/routesList';
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/profile';
import { RouteDetails } from './pages/routes/routeDetails';
import { EditRoute } from './pages/routes/editRoute';
import { EditPlace } from './pages/places/editPlace';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />} /* TODO: Add protected routes */
          />
          <Route path="/app" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new-route" element={<NewRoute />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="travels"
              element={<RoutesList showTitle showSearch />}
            />
            <Route path="travel" element={<RouteDetails />} />
            <Route path="edit-route" element={<EditRoute />} />
            <Route
              path="places"
              element={<PlacesList showTitle showSearch />}
            />
            <Route path="new-place" element={<NewPlace />} />
            <Route path="edit-place" element={<EditPlace />} />
          </Route>
          <Route path="/login">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" /* TODO: Add 404 */ />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>,
);
