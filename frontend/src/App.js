import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./components/home/HomePage.jsx";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer.jsx";
import { user__myProfileAction } from "./actions/userAction.js";
import { clearErrors } from "./actions/productAction.js";
import LoginSignUp from "./components/user/LoginSignUp.jsx";
import Useroptions from "./components/layout/header/Useroptions.jsx";
import ProductDetails from "./components/product/ProductDetails.jsx";
import Products from "./components/product/Products.jsx";
import Search from "./components/product/Search.jsx";
import Contact from "./components/layout/contact/Contact.jsx";
import About from "./components/layout/about/About.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Profile from "./components/user/Profile.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import UpdatePassowrd from "./components/user/UpdatePassowrd.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import ResetPassword from "./components/user/ResetPassword.jsx";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping";
import OrderSuccess from "./components/cart/OrderSuccess";
import MyOrders from "./components/order/MyOrders.js";
import ConfirmOrder from "./components/cart/ConfirmOrder.js";
import OrderDetails from "./components/order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js";
import NotFound from "./components/layout/NotFound.jsx"
import Payment from "./components/cart/Payment.js"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user__profile);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(user__myProfileAction());
    getStripeApiKey();
    dispatch(clearErrors());
  }, [dispatch]);
  console.log(stripeApiKey)
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <Useroptions user={user} />}
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/product/:productId" Component={ProductDetails} />
          <Route path="/products" Component={Products} />
          <Route path="/products/:keyword" Component={Products} />
          <Route path="/search" Component={Search} />
          <Route path="/contact" Component={Contact} />
          <Route path="/about" Component={About} />
          <Route path="/login" Component={LoginSignUp} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/account" Component={Profile} />
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/me/update" Component={UpdateProfile} />
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/password/update" Component={UpdatePassowrd} />
          </Route>
          <Route path="/password/reset" Component={ForgotPassword} />
          <Route path="/password/reset/:token" Component={ResetPassword} />
          <Route exact path="/cart" Component={Cart} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/shipping" Component={Shipping} />
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/success" Component={OrderSuccess} />
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/orders" Component={MyOrders} />
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/order/confirm" Component={ConfirmOrder} />
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/order/:id" Component={OrderDetails} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/dashboard" Component={Dashboard} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/products" Component={ProductList} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/product" Component={NewProduct} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/product/:id" Component={UpdateProduct} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/orders" Component={OrderList} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/order/:id" Component={ProcessOrder} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/users" Component={UsersList} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/user/:id" Component={UpdateUser} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin/reviews" Component={ProductReviews} />
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/process/payment" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }/>            
          </Route>
          <Route path="*" Component={NotFound}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
