import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import IProduct from "../../main/interfaces/IProduct";
import {
  addProduct,
  ICartProduct,
} from "../../main/store/stores/cart/cart.store";
import "./style.css";
const ProductDetail = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleProduct();
  }, []);
  const getSingleProduct = async () => {
    const singleProduct: IProduct = await (
      await axios.get(`product/${param.id}`)
    ).data;
    setProduct(singleProduct);
  };

  const handleClick = () => {
    const prd: ICartProduct = { product, quantity };
    dispatch(addProduct(prd));
    navigate("/cart");
  };

  if (product === null) return <h3>Loading...</h3>;
  return (
    <main className="default-main">
      <div className="default-container product-detail-container">
        <div className="product-image">
          <img
            src={`data:image/jpeg;base64,${product.base64Image}`}
            alt={`${product.name}`}
          />
        </div>
        <div className="product-description">
          <h3>{product.name}</h3>
          <p>
            Your Price <span>£{product.price.toFixed(2)}</span>
          </p>
          <div className="product-order-info">
            <div className="order-info-quantity">
              <span>Quantity</span>
              <select
                onChange={(e) => setQuantity(Number(e.target.value))}
                name="quantity"
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
            <button onClick={handleClick} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
          <div className="product-shipping">
            <h3>Shipping</h3>
            <ul>
              <li>This item ships within one business day.</li>
            </ul>
          </div>
          <div className="product-details">
            <h3>Details</h3>
            <ul>
              <li>Product ID: {product.id}</li>
              <li>100% original</li>
              <li>Country of origin: Turkey</li>
              <li>Fit for you!</li>
            </ul>
          </div>
          <div className="product-more-description">
            <h3>Description</h3>
            <p>{product.longDescription}</p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProductDetail;
