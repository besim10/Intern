import "./style.css";
import xIcon from "../../assets/images/x.svg";
import bagIcon from "../../assets/images/bag.svg";
import IProduct from "../../main/interfaces/IProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProductQuantity,
  deleteProductById,
  IQuantityPayload,
} from "../../main/store/stores/cart/cart.store";
import { RootState } from "../../main/store/redux/rootState";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (e: any, product: IProduct) => {
    const payload: IQuantityPayload = {
      productId: product.id,
      quantity: Number(e.target.value),
    };
    dispatch(changeProductQuantity(payload));
  };

  const handleRemoveBtn = (product: IProduct) => {
    const payload = product.id;
    dispatch(deleteProductById(payload));
  };

  const handleClick = () => {
    navigate("/dashboard");
  };
  const handleCheckOutBtn = () => {
    navigate("/shipping");
  };
  return (
    <main className="default-main">
      <div className="default-container">
        <h3>Your Items</h3>
        {cart.products.length === 0 ? (
          <div className="no-items-container">
            <h3>Your Shopping Cart Is Empty</h3>
            <button onClick={handleClick} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-products">
            <ul className="cart-list">
              {cart.products.map((cartProduct) => (
                <li key={cartProduct.product.id} className="cart-list__item">
                  <img
                    src={`data:image/jpeg;base64,${cartProduct.product.base64Image}`}
                    alt={`${cartProduct.product.name}`}
                  />
                  <div className="card-info-quantity">
                    <h3>{cartProduct.product.name}</h3>
                    <span>Quantity:</span>
                    <select
                      name="quantity"
                      value={cartProduct.quantity}
                      onChange={(e) =>
                        handleQuantityChange(e, cartProduct.product)
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  <div className="cart-item__price">
                    <h4>£{cartProduct.product.price * cartProduct.quantity}</h4>
                    <span>each £{cartProduct.product.price}</span>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => {
                      handleRemoveBtn(cartProduct.product);
                    }}
                  >
                    <img src={xIcon} alt="remove-icon" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-checkout">
              <h4>Cart</h4>
              <h4>
                Cart Total <span>£{cart.totalValue.toFixed(2)}</span>
              </h4>
              <button className="checkout-btn" onClick={handleCheckOutBtn}>
                <p>
                  <img src={bagIcon} alt="checkout-btn" />
                  <span>Checkout</span>
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default Cart;
