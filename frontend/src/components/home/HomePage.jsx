import React, { useEffect } from 'react'
import MetaData from "../layout/MetaData.jsx";
import Loader from "../layout/loader/Loader.jsx";
import { CgMouse } from "react-icons/cg";
import ProductCard from "../layout/product/ProductCard.jsx"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, user__getAllProductAction } from "../../actions/productAction.js"
import "./style.css"
const HomePage = () => {
  const alert = useAlert()
  const { loading, error, products } = useSelector((state) => state.allProducts)
  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(user__getAllProductAction())
  }, [alert,dispatch,error])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {
              products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default HomePage