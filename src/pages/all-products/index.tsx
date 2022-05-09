import { useSelector } from "react-redux";
import ProductList from "../../main/components/ProductList";
import IProduct from "../../main/interfaces/IProduct";
import { RootState } from "../../main/store/redux/rootState";

const AllProducts = () => {
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products
  );
  const search: string = useSelector((state: RootState) => state.search);
  const productsToDisplay = () => {
    let copyOfProducts = [...products];

    copyOfProducts = copyOfProducts.filter((product) =>
      product.name.toUpperCase().includes(search.toUpperCase())
    );
    return copyOfProducts;
  };
  return (
    <>
      <h3 className="product-description-name">All products</h3>
      <ProductList productsToDisplay={productsToDisplay} />;
    </>
  );
};
export default AllProducts;
