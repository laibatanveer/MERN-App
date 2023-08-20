import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import {
  RiArrowDropUpLine,
  RiArrowDropDownLine,
  RiShoppingCartLine,
} from "react-icons/ri";

export default function ProductsPage() {
  const { ProductName } = useParams();
 
  const [product, setProduct] = useState({});
  const [review, setReview] = useState("");
  const [ratingStar, setRatingStar] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const ratingChanged = (newRating) => {
    setRatingStar(newRating);
  };

  const submitReview = () => {
    const payload = {
      productID: _id,
      review: review,
      rating: ratingStar,
    };

    console.log(payload);

    setSubmittedReviews([...submittedReviews, payload]);

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
      ...product,
      productQuantity,
      totalPrice: `100$` * productQuantity,
    };

    console.log(payload);

    Swal.fire({
      title: "Added to Cart!",
      text: "Check your Cart for Check Out",
      icon: "success",
      confirmButtonText: "Continue Shopping",
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/product/${ProductName}}`)
      .then((response) => {
        setProduct(response.data.Product);

      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  }, [ProductName]);

  return (
    <div className="container">
      <div className="text-center my-5">
        <h1>{product.ProductName} - {product.Price}</h1>

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
          {product.ProductImage && (
            <img
              src={product.ProductImage}
              alt={product.ProductName}
              className="img-fluid w-60 h-50 rounded ms-6 mt-4 "
            />
          )}
        </div>

        <div className="col-md-6">
          <div className="container">
            <div className="mb-5">
              <h2 className="text-center">Reviews</h2>
              {product.reviews &&
                product.reviews.length > 0 &&
                product.reviews.map((reviewItem, index) => (
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
