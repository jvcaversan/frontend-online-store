import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchPage extends React.Component {
  render() {
    const { typedText,
      searchedItems,
      loaded,
      categoriesList,
      storedId,
      handleChange,
      searchClick,
      addToCart,
      quantityTotal } = this.props;

    return (
      <div className="corpo">
        <ul>
          {categoriesList.map((categorie) => (
            <div key={ categorie.id }>
              <input
                type="radio"
                id={ categorie.id }
                value={ categorie.name }
                name="radioButton"
                onClick={ storedId }
              />
              <label
                htmlFor={ categorie.id }
                data-testid="category"
              >
                {categorie.name}
              </label>
            </div>))}
        </ul>
        <div className="corpoSearch">
          <section className="sectionInput">
            <input
              type="text"
              value={ typedText }
              data-testid="query-input"
              placeholder="Pesquise um produto"
              onChange={ handleChange }
            />
            <button
              type="submit"
              data-testid="query-button"
              onClick={ searchClick }
            >
              Pesquisar
            </button>
            <Link data-testid="shopping-cart-button" to="/cart">
              <img src="https://cdn-icons-png.flaticon.com/512/126/126510.png" width={ 25 } alt="" />
              <p data-testid="shopping-cart-size">{`Total: ${quantityTotal}`}</p>
            </Link>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </section>
          <div className="sectionProducts">
            {
              searchedItems.map((item) => (
                <div key={ item.id } className="product">
                  <Link to={ `/details/${item.id}` } data-testid="product-detail-link">
                    <div key={ item.id } data-testid="product" className="subproduct">
                      <p>{item.title}</p>
                      {
                        item.shipping.free_shipping
                        && <p data-testid="free-shipping">Frete grátis</p>
                      }
                      <img src={ item.thumbnail } alt={ item.title } />
                      <p>{`R$${item.price}`}</p>
                    </div>
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    id={ item.id }
                    onClick={ (e) => { addToCart(e, item); } }
                  >
                    Adicione ao carrinho
                  </button>
                </div>
              ))
            }
          </div>
          <section>
            {
              loaded && <p>Nenhum produto foi encontrado</p>
            }
          </section>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  typedText: PropTypes.string.isRequired,
  searchedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool.isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  storedId: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchClick: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  quantityTotal: PropTypes.number.isRequired,
};

export default SearchPage;
