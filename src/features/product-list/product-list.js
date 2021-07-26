import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../shopping-cart/shoppingCartSlice';
import Modal from '../modal/modal';
import { useHistory } from "react-router-dom";
import './product-list.scss';

export default function ProductList(props) {
	const phones = useSelector(state => state.product);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	let history = useHistory();
	const button = useRef(null);

	const phoneList = phones.map(phone => {
		const add = () => {
			dispatch(addItem(phone));
			setShowModal(true);
		}

		const directToDetail = e => {
			if (e.relatedTarget === button.current) {
				e.preventDefault();
			} else {
				history.push(`/phone/${phone.id}`);
			}
		}

		return (
			<div className="product-container" onClick={directToDetail} key={phone.id}>
				<img src={phone.images[0]} alt="phone" />
				<span>{phone.title}</span>
				<span>{"$" + phone.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
				<p>{phone.description}</p>
				<button onClick={add} ref={button}>Add to cart</button>
			</div>
		)
	});

	useEffect(() => {
		if (showModal) {
			const time = setTimeout(() => {setShowModal(false)}, 2000);
			return () => clearTimeout(time)
		}
	}, [showModal]);

	return (
		<div className="product-list-container">
			{phoneList}
			{showModal ? <Modal /> : null}
		</div>
	)
}