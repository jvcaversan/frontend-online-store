import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromId } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    details: [],
    attributes: [],
    email: '',
    rating: '',
    comment: '',
    localReview: [],
    freeShipping: false,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getProductsFromId(id);
    this.setState({
      details: result,
      attributes: result.attributes,
      freeShipping: result.shipping.free_shipping,
    });
    if (localStorage.getItem('review')) {
      const reviewId = JSON.parse(localStorage.getItem('review'));
      this.setState({ localReview: reviewId });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick = () => {
    const { email, rating, comment, localReview } = this.state;
    const obj = {
      email,
      rating,
      comment,
    };
    const review = [...localReview, obj];
    this.setState({
      localReview: review,
    });
    localStorage.setItem('review', JSON.stringify(review));
  }

  render() {
    const { details, attributes, localReview, freeShipping } = this.state;
    const { addToCart, quantityTotal } = this.props;
    return (
      <div>
        <div>
          <h2 data-testid="product-detail-name">
            {`${details.title} - R$ ${details.price}`}
          </h2>
          <img
            src={ details.thumbnail }
            width={ 200 }
            alt={ `Foto de ${details.title}` }
          />
        </div>
        <div>
          <ul>
            {attributes.map((det) => (
              <li key={ det.name }>
                {`${det.name}: ${det.value_name}`}
              </li>))}
          </ul>
          {
            freeShipping
            && <p data-testid="free-shipping">Frete grátis</p>
          }
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          id={ details.id }
          onClick={ (e) => addToCart(e, details) }
        >
          Adicione ao carrinho
        </button>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://cdn-icons-png.flaticon.com/512/126/126510.png" width={ 25 } alt="" />
          <p data-testid="shopping-cart-size">{`Total: ${quantityTotal}`}</p>
        </Link>
        <form>
          <div>
            <label htmlFor="email">
              <input
                data-testid="product-detail-email"
                type="email"
                name="email"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <select
            onChange={ this.handleChange }
            name="rating"
          >
            <option value="1" data-testid="1-rating">1</option>
            <option value="2" data-testid="2-rating">2</option>
            <option value="3" data-testid="3-rating">3</option>
            <option value="4" data-testid="4-rating">4</option>
            <option value="5" data-testid="5-rating">5</option>
          </select>
          <label htmlFor="comment">
            <textarea
              data-testid="product-detail-evaluation"
              onChange={ this.handleChange }
              name="comment"
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.handleClick }
          >
            Enviar
          </button>
        </form>
        {localReview.map((review) => (
          <div key={ review.email }>
            <p>{ review.email }</p>
            <p>{ review.rating }</p>
            <p>{ review.comment }</p>
          </div>
        ))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string }) },
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  quantityTotal: PropTypes.number.isRequired,
};

export default ProductDetails;
