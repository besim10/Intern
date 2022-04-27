import IProduct from "../../interfaces/IProduct";
import "./style.css";
type Props = {
  product: IProduct;
};
const ProductItem = ({ product }: Props) => {
  return (
    <li className="product-item">
      <img
        src={`data:image/jpeg;base64,${product.base64Image}`}
        alt={`${product.name}`}
      />
      <p className="product-item__description">
        {product.name}
        <span className="product-item__price">£ {product.price}</span>
      </p>
    </li>
  );
};
export default ProductItem;
