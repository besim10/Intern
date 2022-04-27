import { useSelector } from "react-redux";
import IProduct from "../../interfaces/IProduct";
import { RootState } from "../../../main/store/redux/rootState";
import ProductItem from "../ProductItem";
import "./style.css";
const ProductList = () => {
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products
  );

  return (
    <ul className="product-list">
      {products.map((product, index) => (
        <ProductItem product={product} />
      ))}
    </ul>
  );
};
export default ProductList;
