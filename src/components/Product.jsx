import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, increase, decrease } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());

    // const fetchProduct = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products/");
    //   const data = await res.json();
    //   console.log(data);
    //   setProducts(data);
    // };
    // fetchProduct();
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  const getCartItem = (id) => {
    return cartItems.find((item) => item.id === id);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (status === STATUSES.LOADING) {
    return <h2>Loading.....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!!</h2>;
  }

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}
      >
        <input
          type="text"
          placeholder="Browse your trends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px 20px",
            width: "50%",
            fontSize: "16px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />
      </div>
      <div className="productsWrapper">
        {products.map((product) => {
          const cartItem = getCartItem(product.id);

          return (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <h5>₹{product.price}</h5>

              {!cartItem ? (
                <button onClick={() => handleAdd(product)} className="btn">
                  Add to cart
                </button>
              ) : (
                <div className="cart-controls">
                  <button onClick={() => dispatch(decrease(product.id))}>
                    -
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => dispatch(increase(product.id))}>
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
