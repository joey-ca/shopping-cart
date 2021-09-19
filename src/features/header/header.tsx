import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import './header.scss';

export default function Header(props: any): JSX.Element {
  const cartItems = useAppSelector(state => state.shoppingCart.itemCount);
  const [cartItemsNum, setCartItemsNum] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    let sum: number = 0;
    cartItems.forEach((value) => {
      if (typeof value === 'number') {
        sum += value;
      }
    })
    setCartItemsNum(sum);
  }, [cartItems]);

  useEffect(() => {
    const time = setTimeout(() => {setShowTooltip(false)}, 6000);
    return () => clearTimeout(time)
  }, []);

  return (
    <div className="nav-container">
    	<nav>
    		<Link to="/">Phoenix</Link>
    		<Link to="/cart">
    			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" viewBox="0 0 16 16">
  					<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
				  </svg>
          {/*{ (cartItems.length && cartItems.length != null) ?
            (<span className="cart-item-num-container"><span>{cartItemsNum}</span></span>) :
            (<span className="cart-item-num-container"><span>0</span></span>)
          }*/}
          <span className="cart-item-num-container"><span>{cartItemsNum}</span></span>
          {showTooltip ? (<span className="tooltiptext">Please click me to view the shopping cart</span>) : null}
			</Link>
    	</nav>
    </div>
  )
}



