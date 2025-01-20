import "./App.css";
import HomePage from "./components/Home/HomePage";
import Navbar from "./components/Navbar/Navbar";
import ProductsPage from "./components/products/ProductsPage";
import SingleProductPage from "./components/SingleProduct/SingleProductPage";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* <HomePage /> */}
        {/* <ProductsPage /> */}
        <SingleProductPage />
      </main>
    </div>
  );
}

export default App;
