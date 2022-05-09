import { useSelector } from "react-redux";
import ICategory from "../../interfaces/ICategory";
import "./style.css";
import { RootState } from "../../store/redux/rootState";
import { NavLink } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
const Categories = () => {
  const categories: ICategory[] = useSelector(
    (state: RootState) => state.categories
  );
  const user = useGetUser();
  if (categories == null && user !== null) return <h3>Loading</h3>;
  return (
    user && (
      <ul className="categories-list">
        <NavLink to="/">
          <li className="categories-list__item">All Products</li>
        </NavLink>
        {categories.map((category) => (
          <NavLink to={`/Category/${category.description}`} key={category.id}>
            <li className="categories-list__item">{category.description}</li>
          </NavLink>
        ))}
      </ul>
    )
  );
};
export default Categories;
