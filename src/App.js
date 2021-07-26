import React from 'react';
import './App.scss';
import Header from './features/header/header';
import ProductList from './features/product-list/product-list';
import ShoppingCart from './features/shopping-cart/shopping-cart';
import ProductDetail from './features/product-detail/product-detail';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

export default function App(props) {
  return (
    <Router>
      <Header />
      <main>
        <Switch>       
          <Route exact path="/" component={ProductList} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route path="/phone/:id" component={ProductDetail} />
        </Switch>
      </main>
    </Router>
  )
}

