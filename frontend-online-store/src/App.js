import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CartShop from './pages/CartShop';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import SearchPage from './pages/SearchPage';
import { getProductsFromCategoryAndQuery,
  getCategories } from './services/api';

class App extends React.Component {
  state = {
    typedText: '',
    searchedItems: [],
    loaded: false,
    categoriesList: [],
    categorieId: '',
    shoppingCart: [],
    quantity: 0,
  }

  async componentDidMount() {
    const resultList = await getCategories();
    if (localStorage.getItem('item')) {
      this.getItemLocal();
    }
    this.setState({ categoriesList: resultList });
  }

  getItemLocal = () => {
    const getLocal = JSON.parse(localStorage.getItem('item'));
    this.setState({ shoppingCart: getLocal }, this.quantityAll);
  }

  handleChange = (e) => {
    this.setState({ typedText: e.target.value });
  }

  storedId = (event) => {
    this.setState({ categorieId: event.target.id }, this.searchClick);
  }

  searchClick = async () => {
    const { typedText, categorieId } = this.state;
    const products = await getProductsFromCategoryAndQuery(categorieId, typedText);
    const { results } = products;
    this.setState({
      typedText: '',
      searchedItems: results,
      loaded: results.length === 0,
    });
  }

  addToCart = (e, details) => {
    const { id } = e.target;
    const { shoppingCart } = this.state;

    if (shoppingCart.some((element) => element.id === id)) {
      if (shoppingCart.find((element) => element.id === id).quantity
            === shoppingCart.find((element) => element.id === id).available_quantity) {
        shoppingCart.find((element) => element.id === id).quantity = shoppingCart
          .find((element) => element.id === id).available_quantity;
        this.setState({ shoppingCart },
          localStorage.setItem('item', JSON.stringify(shoppingCart)));
        this.quantityAll();
      } else {
        shoppingCart.find((element) => element.id === id).quantity += 1;
        this.setState({ shoppingCart },
          localStorage.setItem('item', JSON.stringify(shoppingCart)));
        this.quantityAll();
      }
    } else {
      const result = details;
      result.quantity = 1;
      const shoppingList = [...shoppingCart, result];
      this.setState(() => ({
        shoppingCart: shoppingList,
      }), this.quantityAll);
      localStorage.setItem('item', JSON.stringify(shoppingList));
    }
  }

  quantityAll = () => {
    const { shoppingCart } = this.state;
    const result = shoppingCart.map((item) => item.quantity)
      .reduce((resultado, curr) => resultado + curr, 0);
    this.setState({ quantity: result });
  }

  render() {
    const { typedText, searchedItems, loaded, categoriesList, quantity } = this.state;
    return (

      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<SearchPage
              { ...props }
              typedText={ typedText }
              searchedItems={ searchedItems }
              loaded={ loaded }
              categoriesList={ categoriesList }
              addToCart={ this.addToCart }
              searchClick={ this.searchClick }
              storedId={ this.storedId }
              handleChange={ this.handleChange }
              quantityTotal={ quantity }
            />) }
          />
          <Route
            exact
            path="/details/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              addToCart={ this.addToCart }
              quantityTotal={ quantity }
            />) }
          />
          <Route
            exact
            path="/cart"
            render={ (props) => (<CartShop
              { ...props }
              getItemLocal={ this.getItemLocal }
            />) }
          />
          <Route exact path="/checkout" render={ () => <Checkout /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
