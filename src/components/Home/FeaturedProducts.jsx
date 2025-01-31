import useData from "../../Hook/useData";
import ProductCard from "../products/ProductCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const { data: products, error, isLoading } = useData("products/featured");
  const skeletons = [1, 2, 3];
  //console.log(data);

  return (
    <section className="featured_products">
      <h2>주요제품</h2>

      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {products &&
          !isLoading &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
