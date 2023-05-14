import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Sidebar from "./components/sidebar/Sidebar";
import Forgot from "./Pages/auth/Forgot";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Reset from "./Pages/auth/Reset";
import Dashboard from "./Pages/dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./Pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./Pages/editProduct/EditProduct";
import Profile from "./Pages/profile/Profile";
import EditProfile from "./Pages/profile/EditProfile";
import Contact from "./Pages/Contact/Contact";



axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);


  return (
    <div>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/resetpassword/:resetToken" element={<Reset />} />

          <Route path="/dashboard" element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          } />

          <Route path="/add-product" element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          } />

          <Route path="/product-detail/:id" element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          } />

          <Route path="/edit-product/:id" element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          } />

          <Route path="/profile" element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          } />

          <Route path="/edit-profile" element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          } />

          <Route path="/contact-us" element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
