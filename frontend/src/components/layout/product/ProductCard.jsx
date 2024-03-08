import React from 'react'
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab"
import "./style.css"
const ProductCard = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    let id = product._id
    return (
        <Link className="productCard" to={`/product/${id}`}>
            <img src={product.images[0].url} alt={"product.name"} />
            <p>{product.name}</p>
            <div className='rating'>
                <Rating {...options} />
                <span className="productCardSpan">
                    ({product.noofreview} Reviews)
                </span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    )
}

export default ProductCard