import React, { useContext } from "react";
import { GlobalContext } from "../../Context/context";
import { decodeToken } from "react-jwt";
import { CartContext } from "../CartContext/context";
import axios from "axios";
import Swal from "sweetalert2";

export default function Cart() {
  const { cart_state, cart_dispatch } = useContext(CartContext);
  const { state } = useContext(GlobalContext);

  const total = cart_state?.cart?.reduce(
    (accumulator, Product) =>
      accumulator + Product.price * Product.productQuantity,
    0
  );

  const user = decodeToken(state.token);

  const removeFromCart = (productId) => {
    cart_dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    console.log(productId);
  };

  const checkout = () => {
    const payload = {
      order: cart_state.cart,
      totalBill: total,
      customerAddress: "Baker's Street 907",
      customerContact: "0900 78601",
      customerName: user.username,
      customerEmail: user.email,
      customerId: user._id,
    };

    axios
      .post("http://localhost:3000/api/order/placeOrder", payload)
      .then((json) => {
        cart_dispatch({ type: "CLEAR_CART" });
        Swal.fire({
          title: "Success!",
          text: json.data.message,
          icon: "success",
          confirmButtonText: "Continue Exploring",
        });
      })
      .catch((err) => console.error("Error placing order:", err));
  };

  return (
    <div className="container">
      <h2 className="text-center">Cart</h2>
      <p className="text-center text-secondary">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius
        totam nostrum voluptatibus culpa accusamus.
      </p>

      {cart_state.cart?.length > 0 ? (
        <>
          {cart_state.cart.map((product, key) => (
            <div
              className="card mb-4 d-flex bg-shadow bg-rounded"
              style={{ width: "70vw", height: "40vh" }}
              key={key}
            >
              <div className="row ">
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                  <img
                    src={product.ProductImage}
                    alt={product.productName}
                    className="img-fluid rounded-start"
                    style={{ height: "25vh", objectFit: "contain" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.productName} - {product.price}
                    </h5>
                    <p className="card-text">
                      Quantity: {product.productQuantity}
                    </p>
                  </div>
                </div>
                <div className="col-md-2">
                  <p>Total: {product.productQuantity * product.price} </p>
                </div>

                <div className="col-md-2 d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between my-3">
            <h3>Total</h3>
            <h3>{total}</h3>
          </div>
          <button className="btn btn-warning w-100" onClick={checkout}>
            Place Order
          </button>
        </>
      ) : (
        <div className="text-center my-5 text-muted">
          <h3>No Items in the Cart</h3>
        </div>
      )}
    </div>
  );
}
