import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease, remove, clearCart } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const itemSelected = useSelector((state) => state.cart);
  const username = localStorage.getItem("loggedInUser");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleBuyNow = () => {
    if (itemSelected.length === 0) return;

    setShowConfirmation(true);
    setOrderSuccess(false);
  };

  const confirmOrder = () => {
    dispatch(clearCart());
    setShowConfirmation(false);
    setOrderSuccess(true);
  };

  const cancelOrder = () => {
    setShowConfirmation(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <h3 style={{ textAlign: "center" }}>Cart</h3>
      <div className="cartWrapper">
        {itemSelected.map((product) => (
          <div key={product.id} className="cartCard">
            <img src={product.image} alt="product-img" />
            <h5>{product.title}</h5>
            <p>Price: ₹{product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Total: ₹{product.price * product.quantity}</p>
            <button
              className="btn"
              onClick={() => dispatch(increase(product.id))}
            >
              +
            </button>
            <button
              className="btn"
              onClick={() => dispatch(decrease(product.id))}
            >
              -
            </button>
            <button
              className="btn"
              onClick={() => dispatch(remove(product.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {itemSelected.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      )}

      {showConfirmation && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>Are you sure you want to place the order?</p>
          <button
            className="btn"
            onClick={confirmOrder}
            style={{ marginRight: "10px" }}
          >
            Yes
          </button>
          <button className="btn" onClick={cancelOrder}>
            No
          </button>
          <p>
            <strong>
              Cart Total: ₹
              {itemSelected.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </strong>
          </p>
        </div>
      )}

      {orderSuccess && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "10px",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            ✅ Order Placed Successfully!
          </h2>
          <p style={{ fontSize: "18px" }}>
            Thank you, <strong>{username}</strong>, for shopping with us.
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
