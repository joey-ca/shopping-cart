import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeItem, plusItem, minusItem } from '../shopping-cart/shoppingCartSlice';
import { Link } from "react-router-dom";
import './shopping-cart.scss';
import type { ProductState } from '../product/productSlice';

export default function ShoppingCart(props: any): JSX.Element {
	const cartItems = useAppSelector(state => state.shoppingCart);
	const dispatch = useAppDispatch();

	let sum = 0;
	for (let i = 0; i < cartItems.itemCount.length; i++) {
		if(cartItems.itemCount[i]){
			let item = cartItems.uniqueItems[i] as ProductState;
			let num = cartItems.itemCount[i] as number;
			const itemPrice = parseFloat(item.price.toFixed(2));
			sum += num * itemPrice;
		}
	}

	const cartItemsList = cartItems.uniqueItems.map(item => {
		
		if(item) {
			const handleRemove = () => {
				dispatch(removeItem(item.id));
			}
			const handleMinus = () => {
				dispatch(minusItem(item.id));
			}
			const handlePlus = () => {
				dispatch(plusItem(item.id));
			}

			return (
				<table key={item.id * 100}>
					<tbody>
						<tr>
							<td><img src={item.images[0]} alt="cart-item" /></td>
							<td className="item-title">
								<span><Link to={`phone/${item.id}`}>{item.title}</Link></span>
								<div className="count-controller">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={handleMinus}>
									  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
									  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
									</svg>
									<span>{cartItems.itemCount[item.id]}</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={handlePlus}>
									  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
									  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
									</svg>
								</div>
							</td>
							<td>
								{"$" + item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
								<br/>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={handleRemove}>
								  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
								  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
								</svg>
							</td>
						</tr>
					</tbody>
				</table>
			)
		} else {
			return null;
		}
	});

	return (
		<div className="shopping-cart-container">
			<div className="cart-title">
				<span>Your Cart</span>
			</div>
			<div className="cart-product">
				{cartItemsList}
			</div>
			<div className="cart-total-price">
				<span>Total Price</span>
				<span>${sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
			</div>
			<button>Continue to Checkout</button>
		</div>
	)
}