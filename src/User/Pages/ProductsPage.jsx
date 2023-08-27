import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import {
  RiArrowDropUpLine,
  RiArrowDropDownLine,
  RiShoppingCartLine,
} from "react-icons/ri";
import { CartContext } from "../CartContext/context";

export default function ProductsPage() {
  const { _id } = useParams();

  const [Product, setProduct] = useState({});
  const [review, setReview] = useState("");
  const [ratingStar, setRatingStar] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const ratingChanged = (newRating) => {
    setRatingStar(newRating);
  };

  const { cart_state, cart_dispatch } = useContext(CartContext);

  const submitReview = () => {
    const payload = {
      productID: Product._id,
      price: Product.price,

      review: review,
      rating: ratingStar,
    };

    // console.log(payload);

    setSubmittedReviews((prevReviews) => [...prevReviews, payload]);

    Swal.fire({
      title: "Successfully Submitted!",
      text: "We really appreciate your Review!",
      icon: "success",
      confirmButtonText: "Happy Shopping",
    });

    setReview("");
    setRatingStar(0);
  };

  const addToCart = () => {
    const payload = {
      ...Product,
      productQuantity,
      totalPrice:  Product.price  * productQuantity,
    };

    console.log(payload);

    cart_dispatch({
      type: "ADD_TO_CART",
      payload,
    });

    Swal.fire({
      title: "Added to Cart!",
      text: "Check your Cart for Check Out",
      icon: "success",
      confirmButtonText: "Continue Shopping",
    });
  };

  useEffect(() => {
    console.log(cart_state);
    console.log(_id);

    axios
      .get(`http://localhost:3000/api/products/product/${_id}`)
      .then((response) => {
        setProduct(response.data.foundProduct);
        // setProduct(response.data.Product[0]);
        console.log(response.data.foundProduct);
      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="text-center my-5">
        <h1>
          {Product.ProductName} - {Product.price}
        </h1>

        <div className="d-flex justify-content-center">
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={ratingStar}
            color2={"#ffd700"}
          />
        </div>

        <div className="my-3">
          <button
            className="btn btn-dark mx-3"
            disabled={productQuantity > 1 ? false : true}
            onClick={() => setProductQuantity(productQuantity - 1)}
          >
            <RiArrowDropDownLine />
          </button>
          {productQuantity}
          <button
            className="btn btn-dark mx-3"
            onClick={() => setProductQuantity(productQuantity + 1)}
          >
            <RiArrowDropUpLine />
          </button>
        </div>

        <button className="btn btn-dark" onClick={addToCart}>
          <RiShoppingCartLine className="mr-2" />
          Add to Cart
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          {Product.ProductImage && (
            <img
              src={Product.ProductImage}
              alt={Product.ProductName}
              className="img-fluid w-60 h-50 rounded ms-6 mt-4 "
            />
          )}
        </div>

        <div className="col-md-6">
          <div className="container">
            <div className="mb-5">
              <h2 className="text-center">Reviews</h2>
              {Product.reviews &&
                Product.reviews.length > 0 &&
                Product.reviews.map((reviewItem, index) => (
                  <div key={index} className="card my-3">
                    <div className="card-body">
                      <p>{reviewItem.review}</p>
                      <div className="d-flex align-items-center">
                        <ReactStars
                          count={5}
                          size={24}
                          edit={false}
                          value={reviewItem.rating}
                          color2={"#ffd700"}
                        />
                        <span className="ms-3">({reviewItem.rating})</span>
                      </div>
                    </div>
                  </div>
                ))}

              {submittedReviews.length > 0 &&
                submittedReviews.map((reviewItem, index) => (
                  <div key={index} className="card my-3">
                    <div className="card-body">
                      <p>{reviewItem.review}</p>
                      <div className="d-flex align-items-center">
                        <ReactStars
                          count={5}
                          size={24}
                          edit={false}
                          value={reviewItem.rating}
                          color2={"#ffd700"}
                        />
                        <span className="ms-3">({reviewItem.rating})</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <label htmlFor="floatingTextarea2">Comments</label>
              </div>

              <div className="mt-3">
                Rate Us:
                <div className="d-flex align-items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    value={ratingStar}
                    onChange={ratingChanged}
                    color2={"#ffd700"}
                  />
                  <span className="ms-3">({ratingStar})</span>
                </div>
              </div>
              <button className="my-3 btn btn-dark" onClick={submitReview}>
                Submit review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
