import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  state = {
    categories: [],
    productsObj: [],
    inputPesquisa: '',
    mensage: '',
  }

  componentDidMount() {
    this.fetchCategories();
  }

  searchProducts = async () => {
    const { inputPesquisa } = this.state;
    const result = await getProductsFromCategoryAndQuery(undefined, inputPesquisa);
    this.setState({
      productsObj: result.results,
      mensage: 'Nenhum produto foi encontrado',
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  fetchCategories = async () => {
    const resultado = await getCategories();
    this.setState({ categories: resultado });
  }

  render() {
    const { categories, inputPesquisa, productsObj, mensage } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              categ={ categories }
              onChange={ this.onInputChange }
              onClick={ this.searchProducts }
              inputPesquisa={ inputPesquisa }
              productsObj={ productsObj }
              mensage={ mensage }
            />) }
          />
          <Route path="/cart" component={ Cart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
