import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { addItem } from '../shopping-cart/shoppingCartSlice';
import Modal from '../modal/modal';
import './product-detail.scss';
import type { ProductState } from '../product/productSlice';

export default function ProductDetail(props: any): JSX.Element {
	const phones = useAppSelector(state => state.product);
	const dispatch = useAppDispatch();
	const [showModal, setShowModal] = useState(false);
	
	let {id} = useParams<{id: string}>();

	let render: JSX.Element;

	const phone = phones.find(element => element.id.toString() === id) as ProductState;

	const [mainImage, setMainImage] = useState(phone.images[0]);

	if (phone) {		
		const handleClick = (): void => {
			dispatch(addItem(phone));
			setShowModal(true);
		}

		const handleMouseOver = (e: React.MouseEvent<HTMLImageElement>): void => {
			setMainImage(e.currentTarget.src);
		}

		render = (
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
	} else {
		render = <h1>Error</h1>;
	}

	useEffect(() => {
		if (showModal) {
			const time = setTimeout(() => {setShowModal(false)}, 2000);
			return () => clearTimeout(time)
		}
	}, [showModal]);

	return (
		<div>{render}</div>
	)
}