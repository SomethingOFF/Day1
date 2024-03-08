import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  AllUserReducers,
  changePasswordReducer,
  changeProfileReducer,
  userDetailsReducer,
  userProfileReducer,
} from "./reducers/userReducer";
import {
  allProductsReducer,
  createProductReducer,
  createReviewReducer,
  deleteReviewReducer,
  getAllReviewsReducer,
  productDetailsReducers,
  updateProductReducer,
} from "./reducers/productReducer";
import {
  ALlOrdersReducers,
  OrderDetailsReducer,
  changeOrderReducer,
  createOrderReducer,
} from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducers = combineReducers({
  user__profile: userProfileReducer,
  user__password: changePasswordReducer,
  user___ChangeProfile: changeProfileReducer,
  AllUsers: AllUserReducers,
  user__details: userDetailsReducer,
  allProducts: allProductsReducer,
  admin__createProduct: createProductReducer,
  admin__changeProduct: updateProductReducer,
  productDetails: productDetailsReducers,
  user__createReview: createReviewReducer,
  getAllReview: getAllReviewsReducer,
  user__deleteReview: deleteReviewReducer,
  user__newOrder: createOrderReducer,
  AllOrders: ALlOrdersReducers,
  admin__chnageOrder: changeOrderReducer,
  orderDetails: OrderDetailsReducer,
  mycart: cartReducer,
});

let initialState = {
  mycart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
