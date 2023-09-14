import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';
import CartContext from '../../contexts/CartContext';
import { checkoutAPI } from '../../services/orderServices';

import remove from '../../assets/remove.png';
import Table from '../Common/Table';
import QuantityInput from '../SingleProduct/QuantityInput';
import './CartPage.css';

const CartPage = () => {
	const [subTotal, setSubTotal] = useState(0);
	const user = useContext(UserContext);
	const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

	useEffect(() => {
		let total = 0;
		cart.forEach((item) => {
			total += item.product.price * item.quantity;
		});
		setSubTotal(total);
	}, [cart]);

	const checkout = () => {
		const oldCart = [...cart];
		setCart([]); //카트 비우기
		checkoutAPI()
			.then(() => {
				toast.success('주문 성공!');
			})
			.catch(() => {
				toast.error('checkout 중 에러발생.');
				setCart(oldCart);
			});
	};

	return (
		<section className='align_center cart_page'>
			<div className='align_center user_info'>
				<img src={`http://localhost:5000/profile/${user?.profilePic}`} alt='user profile' />
				<div>
					<p className='user_name'>{user?.name}</p>
					<p className='user_email'>{user?.email}</p>
				</div>
			</div>

			<Table headings={['상품', '가격', '구매수량', '총 금액', '상품삭제']}>
				<tbody>
					{cart.map(({ product, quantity }) => (
						<tr key={product._id}>
							<td>{product.title}</td>
							<td>{product.price.toLocaleString('ko-KR')} 원</td>
							<td className='align_center table_quantity_input'>
								<QuantityInput
									quantity={quantity}
									stock={product.stock}
									setQuantity={updateCart}
									cartPage={true}
									productId={product._id}
								/>
							</td>
							<td>{(quantity * product.price).toLocaleString('ko-KR')} 원</td>
							<td>
								<img
									src={remove}
									alt='remove icon'
									className='cart_remove_icon'
									onClick={() => removeFromCart(product._id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<table className='cart_bill'>
				<tbody>
					<tr>
						<td>총 금액</td>
						<td>{subTotal.toLocaleString('ko-KR')} 원</td>
					</tr>
					<tr>
						<td>배송비</td>
						<td>3,000 원</td>
					</tr>
					<tr className='cart_bill_final'>
						<td>결재금액</td>
						<td>{(subTotal + 3000).toLocaleString('ko-KR')} 원</td>
					</tr>
				</tbody>
			</table>

			<button className='search_button checkout_button' onClick={checkout}>
				결재하기
			</button>
		</section>
	);
};

export default CartPage;
