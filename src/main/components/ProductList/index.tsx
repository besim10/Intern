import { useDispatch, useSelector } from "react-redux";
import IProduct from "../../interfaces/IProduct";
import { RootState } from "../../../main/store/redux/rootState";
import ProductItem from "../ProductItem";
import "./style.css";
import { SetStateAction, useEffect } from "react";
import axios from "axios";
import ICategory from "../../interfaces/ICategory";
import { setCategories } from "../../store/stores/categories/store.categories";
import { setProducts } from "../../store/stores/products/products.store";

const ProductList = () => {
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products
  );
  // const categories: ICategory[] = useSelector(
  //   (state: RootState) => state.categories
  // );
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let categories: ICategory[] = await (
      await axios.get("category/get-all?PageNumber=1&PageSize=20")
    ).data.data;

    const onlySomeCategories = getOnlyFewCategories(categories);

    modifyCategories(categories);

    dispatch(setCategories(onlySomeCategories));

    // modifyProducts(categories);
  };
  const getOnlyFewCategories = (categories: ICategory[]) => {
    return (categories = categories.filter((category) => {
      return category.id >= 6 && category.id <= 9;
    }));
  };

  const modifyCategories = (categories: ICategory[]) => {
    for (const category of categories) {
      const matchedProducts = products.filter(
        (product) => product.categoryId === category.id
      );
      category.products = matchedProducts;
    }
  };

  // const modifyProducts = (categories: ICategory[]) => {
  //   let copyOfProducts = [...products];
  //   for (let product of copyOfProducts) {
  //     let category = categories.find(
  //       (category) => category.id === product.categoryId
  //     );
  //     product.category = category;
  //   }
  // };
  const search: string = useSelector((state: RootState) => state.search);

  const productsToDisplay = () => {
    let copyOfProducts = [...products];

    copyOfProducts = copyOfProducts.filter((product) =>
      product.name.toUpperCase().includes(search.toUpperCase())
    );
    return copyOfProducts;
  };

  // if (categories === null) return <h1>loading</h1>;
  return (
    <main className="default-main">
      <div className="default-container">
        {search != "" ? (
          <p className="search-found-info">Search result for: {search}</p>
        ) : null}
        <h3>All products</h3>
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
