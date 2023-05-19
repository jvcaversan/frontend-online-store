import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

class CartShop extends React.Component {
  state = {
    cart: [],
  }

  async componentDidMount() {
    this.getCartItem();
  }

  getCartItem = () => {
    if (localStorage.getItem('item')) {
      const itemsID = JSON.parse(localStorage.getItem('item'));
      this.setState({ cart: itemsID });
    }
  }

  addItem = (index) => {
    const { cart } = this.state;
    cart[index].quantity += 1;
    if (cart[index].quantity > cart[index].available_quantity) {
      cart[index].quantity = cart[index].available_quantity;
      this.setState({ cart }, localStorage.setItem('item', JSON.stringify(cart)));
    } else {
      this.setState({ cart }, localStorage.setItem('item', JSON.stringify(cart)));
    }
  }

  decreaseItem = (index) => {
    const { cart } = this.state;
    cart[index].quantity -= 1;
    if (cart[index].quantity < 1) {
    //  cart.splice([index], 1);
      cart[index].quantity = 1;
      this.setState({ cart }, localStorage.setItem('item', JSON.stringify(cart)));
    } else {
      this.setState({ cart }, localStorage.setItem('item', JSON.stringify(cart)));
    }
  }

  removeItem = (index) => {
    const { cart } = this.state;
    cart.splice([index], 1);
    this.setState({ cart }, localStorage.setItem('item', JSON.stringify(cart)));
  }

  render() {
    const { cart } = this.state;
    const { getItemLocal } = this.props;
    return (
      <>
        <Link to="/" onClick={ getItemLocal }>
          <img src="https://cdn-icons-png.flaticon.com/512/1243/1243939.png?w=360" alt="" width={ 45 } />
        </Link>
        <img src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="" width={ 45 } />
        <img src="https://cdn-icons-png.flaticon.com/512/15/15457.png" alt="" width={ 45 } />
        <span> Carrinho de Compras </span>
        {cart.length === 0 && (
          <div data-testid="shopping-cart-empty-message">
            <span>Seu carrinho está vazio</span>
          </div>)}
        <div>
          {cart.map((item, index) => (
            <div key={ `${item.id}${index}` }>
              <p data-testid="shopping-cart-product-name">{ item.title }</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{ `R$${Math.round(item.price * item.quantity * 100) / 100}` }</p>
              <button
                type="button"
                onClick={ () => this.decreaseItem(index) }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                {`${item.quantity}`}
              </p>
              <button
                type="button"
                onClick={ () => this.addItem(index) }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                type="button"
                onClick={ () => this.removeItem(index) }
              >
                Remover
              </button>
            </div>
          ))}
          <div>
            <Link
              to="/checkout"
              data-testid="checkout-products"
            >
              Checkout
            </Link>
          </div>
        </div>
      </>
    );
  }
}

CartShop.propTypes = {
  getItemLocal: PropTypes.func.isRequired,
};

export default CartShop;
