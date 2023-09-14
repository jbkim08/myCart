import LinkWithIcon from '../Navbar/LinkWithIcon';
import useData from '../../Hook/useData';
import config from '../../config.json';
import './ProductsSidebar.css';

const ProductsSidebar = () => {
	const { data: categories, error } = useData('/category');

	return (
		<aside className='products_sidebar'>
			<h2>카테고리</h2>

			<div className='category_links'>
				{error && <em className='form_error'>{error}</em>}
				{categories &&
					categories.map((category) => (
						<LinkWithIcon
							key={category._id}
							title={category.name}
							link={`/products?category=${category.name}`}
							emoji={`${config.backendURL}/category/${category.image}`}
							sidebar={true}
						/>
					))}
			</div>
		</aside>
	);
};

export default ProductsSidebar;
