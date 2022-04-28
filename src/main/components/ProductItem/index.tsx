import { Link } from "react-router-dom";
import IProduct from "../../interfaces/IProduct";
import "./style.css";
type Props = {
  product: IProduct;
};
const ProductItem = ({ product }: Props) => {
  return (
    <li className="product-item">
      <Link to={`/dashboard/${product.id}`}>
        <img
          src={`data:image/jpeg;base64,${product.base64Image}`}
          alt={`${product.name}`}
        />
        <p className="product-item__description">
          {product.name}
          <span className="product-item__price">
            £ {product.price.toFixed(2)}
          </span>
        </p>
      </Link>
    </li>
  );
};
export default ProductItem;
