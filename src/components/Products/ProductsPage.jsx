import './ProductsPage.css';
import ProductsSidebar from './ProductsSidebar';
import ProductsList from './ProductsList';

const ProductsPage = () => {
	return (
		<section className='products_page'>
			<ProductsSidebar />
			{/* 왼쪽 사이드 바 */}
			{/* 제품 리스트 */}
			<ProductsList />
		</section>
	);
};

export default ProductsPage;
