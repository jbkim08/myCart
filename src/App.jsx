import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import UserContext from './contexts/UserContext';
import Routing from './components/Routing/Routing';
import Navbar from './components/navbar/Navbar';
import setAuthToken from './utils/setAuthToken';
import {
	addToCartAPI,
	decreaseProductAPI,
	getCartAPI,
	increaseProductAPI,
	removeFromCartAPI,
} from './services/cartServices';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from './contexts/CartContext';

setAuthToken(localStorage.getItem('token'));

const App = () => {
	const [user, setUser] = useState(null);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		try {
			const jwt = localStorage.getItem('token');
			const jwtUser = jwtDecode(jwt);
			if (Date.now() >= jwtUser.exp * 1000) {
				localStorage.removeItem('token');
				location.reload();
			} else {
				setUser(jwtUser);
			}
		} catch (error) {}
	}, []);

	const addToCart = (product, quantity) => {
		const updatedCart = [...cart];
		const productIndex = (updatedCart.findIndex = updatedCart.findIndex(
			(item) => item.product._id === product._id
		));
		if (productIndex === -1) {
			updatedCart.push({ product: product, quantity: quantity });
		} else {
			updatedCart[productIndex].quantity += quantity;
		}
		setCart(updatedCart);
		addToCartAPI(product._id, quantity)
			.then((res) => {
				toast.success('상품 추가 성공!');
			})
			.catch((err) => {
				toast.error('상품 추가에 실패했습니다.');
			});
	};

	const removeFromCart = (id) => {
		const oldCart = [...cart];
		const newCart = oldCart.filter((item) => item.product._id !== id);
		setCart(newCart);

		removeFromCartAPI(id).catch((err) => {
			toast.error('장바구니 상품 삭제 에러');
		});
	};

	const updateCart = (type, id) => {
		const updatedCart = [...cart];
		const productIndex = updatedCart.findIndex((item) => item.product._id === id);

		if (type === 'increase') {
			updatedCart[productIndex].quantity += 1;
			setCart(updatedCart);
			increaseProductAPI(id).catch((err) => {
				toast.error('상품 증가 에러');
			});
		}
		if (type === 'decrease') {
			updatedCart[productIndex].quantity -= 1;
			setCart(updatedCart);
			decreaseProductAPI(id).catch((err) => {
				toast.error('상품 감소 에러');
			});
		}
	};

	const getCart = () => {
		getCartAPI()
			.then((res) => {
				setCart(res.data);
			})
			.catch((err) => {
				toast.error('카트 가져오기에 실패했습니다.');
			});
	};

	useEffect(() => {
		if (user) {
			getCart();
		}
	}, [user]);

	return (
		<UserContext.Provider value={user}>
			<CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, setCart }}>
				<div className='app'>
					<Navbar user={user} cartCount={cart.length} />
					<main>
						<ToastContainer position='bottom-right' />
						<Routing user={user} />
					</main>
				</div>
			</CartContext.Provider>
		</UserContext.Provider>
	);
};

export default App;
