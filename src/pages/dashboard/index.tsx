import { FC, useEffect } from "react";
import "./style.css";
import ProductList from "../../main/components/ProductList";
import IProduct from "../../main/interfaces/IProduct";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import ICategory from "../../main/interfaces/ICategory";
import axios from "axios";
import { setCategories } from "../../main/store/stores/categories/store.categories";
import { setProducts } from "../../main/store/stores/products/products.store";
const DashboardPage: FC = () => {
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products
  );
  const search: string = useSelector((state: RootState) => state.search);

  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
    return () => {
      setCategories(null);
    };
  }, []);

  const getCategories = async () => {
    let categories: ICategory[] = await (
      await axios.get("category/get-all?PageNumber=1&PageSize=20")
    ).data.data;

    categories = categories.filter(
      (category) => category.id >= 6 && category.id <= 9
    );

    for (const category of categories) {
      const matchedProducts = products.filter(
        (product) => product.categoryId === category.id
      );
      category.products = matchedProducts;
    }

    dispatch(setCategories(categories));

    modifyProducts(categories);
  };

  const modifyProducts = (categories: ICategory[]) => {
    let copyOfProducts = JSON.parse(JSON.stringify(products));
    for (let product of copyOfProducts) {
      let category = categories.find(
        (category) => category.id === product.categoryId
      );
      product.category = category;
    }
    dispatch(setProducts(copyOfProducts));
  };

  const productsToDisplay = () => {
    let copyOfProducts = [...products];

    copyOfProducts = copyOfProducts.filter((product) =>
      product.name.toUpperCase().includes(search.toUpperCase())
    );
    return copyOfProducts;
  };
  return (
    <>
      {search != "" ? (
        <p className="search-found-info">Search result for: {search}</p>
      ) : null}
      <h3 className="all-products">All products</h3>
      <ProductList productsToDisplay={productsToDisplay} />
    </>
  );
};

export default DashboardPage;
