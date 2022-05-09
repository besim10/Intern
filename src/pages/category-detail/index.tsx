import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductList from "../../main/components/ProductList";
import IProduct from "../../main/interfaces/IProduct";
import "./style.css";
import { RootState } from "../../main/store/redux/rootState";

const CategoryDetail = () => {
  const param = useParams();
  const search: string = useSelector((state: RootState) => state.search);

  const products: IProduct[] = useSelector(
    (state: RootState) => state.products
  );

  const productsToDisplay = () => {
    return products.filter(
      (product) =>
        product.category?.description === param.name &&
        product.name.toUpperCase().includes(search.toUpperCase())
    );
  };
  return (
    <>
      <h3 className="product-description-name">{param.name} Category</h3>
      <ProductList productsToDisplay={productsToDisplay} />;
    </>
  );
};
export default CategoryDetail;
