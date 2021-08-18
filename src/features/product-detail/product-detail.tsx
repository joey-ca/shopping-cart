import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem, plusItem, minusItem } from '../shopping-cart/shoppingCartSlice';
import Modal from '../modal/modal';
import './product-detail.scss';

export default function ProductDetail(props) {
	const phones = useSelector(state => state.product);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	
	let {id} = useParams();

	const phone = phones.find(element => element.id.toString() === id);

	const [mainImage, setMainImage] = useState(phone.images[0]);
	
	const handleClick = () => {
		dispatch(addItem(phone));
		setShowModal(true);
	}

	const handleMouseOver = e => {
		setMainImage(e.currentTarget.src);
	}

	useEffect(() => {
		if (showModal) {
			const time = setTimeout(() => {setShowModal(false)}, 2000);
			return () => clearTimeout(time)
		}
	}, [showModal]);

	return (
		<div className="product-detail-container">
			<div className="images">
				<img src={mainImage} alt="phone" />
				<div className="thumbnail">
					{phone.images.map(imgLink => <img src={imgLink} alt="thumbnail" onMouseOver={handleMouseOver} />)}
				</div>
			</div>
			<div className="details">
				<span className="product-title">{phone.title}</span>
				<span className="product-price">{"$" + phone.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
				<p><span>Description</span><br/>{phone.description}</p>
				<p><span>Brand</span><br/>{phone.brand}</p>
				<p><span>Size</span><br/>{phone.size}</p>
				<p><span>Weight</span><br/>{phone.weight}</p>
				<p><span>Camera</span><br/>{phone.camera}</p>
				<p><span>CPU</span><br/>{phone.cpu}</p>
				<p><span>Memory</span><br/>{phone.memory}</p>
				<p><span>Display</span><br/>{phone.display}</p>
				<p><span>Battery</span><br/>{phone.battery}</p>
				<button onClick={handleClick}>ADD TO CART</button>
			</div>
			{showModal ? <Modal /> : null}
		</div>
	)
}