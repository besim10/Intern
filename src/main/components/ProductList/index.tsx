import IProduct from "../../interfaces/IProduct";
import ProductItem from "../ProductItem";
import "./style.css";

type Props = {
  productsToDisplay: () => IProduct[];
};
const ProductList = ({ productsToDisplay }: Props) => {
  return (
    <main className="default-main">
      <div className="default-container">
        <ul className="product-list">
          {productsToDisplay().map((product, index) => (
            <ProductItem product={product} key={index} />
          ))}
        </ul>
      </div>
    </main>
  );
};
export default ProductList;
