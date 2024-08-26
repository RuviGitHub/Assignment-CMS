import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import OrderHistory from "../pages/OrderHistory";
import Inquiry from "../pages/Inquiry";
import Item from "../pages/Item";
import Reservations from "../pages/Reservations";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component

const RouterSet = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/order-history"
        element={
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="/inquiry"
        element={
          <PrivateRoute>
            <Inquiry />
          </PrivateRoute>
        }
      />
      <Route
        path="/item"
        element={
          <PrivateRoute>
            <Item />
          </PrivateRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <PrivateRoute>
            <Reservations />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RouterSet;
