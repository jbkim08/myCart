import LinkWithIcon from "../Navbar/LinkWithIcon";
import "./ProductsSidebar.css";
import rocket from "../../assets/rocket.png";
import apiClient from "../../utils/api-client";
import { useEffect, useState } from "react";

const ProductsSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    apiClient
      .get("/category")
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <aside className="products_sidebar">
      <h2>카테고리</h2>

      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories.map((c) => (
          <LinkWithIcon
            key={c._id}
            title={c.name}
            link={`products?category=${c.name}`}
            emoji={`http://localhost:5000/category/${c.image}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
