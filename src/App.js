import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import {
  getCategories,
  getProductsFromQuery,
  getCategoriesList,
} from './services/api';

class App extends React.Component {
  state = {
    categories: [],
    productsObjInput: [],
    inputPesquisa: '',
    mensage: '',
    productsObjBtn: [],
    mensage2: '',
  }

  componentDidMount() {
    this.fetchCategories();
  }

  searchProducts = async () => {
    const { inputPesquisa } = this.state;
    this.setState({
      productsObjBtn: [],
      productsObjInput: [],
      mensage: '',
      mensage2: '',
    });

    const result = await getProductsFromQuery(inputPesquisa);
    this.setState({
      productsObjInput: result.results,
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

  catBtn = async ({ target }) => {
    const { id } = target;
    this.setState({
      productsObjInput: [],
      productsObjBtn: [],
      mensage2: '',
      mensage: '',
    });

    const result = await getCategoriesList(id);
    this.setState({
      productsObjBtn: result.results,
      mensage2: 'Nenhum produto foi encontrado',
    });
  };

  render() {
    const {
      categories,
      inputPesquisa,
      productsObjInput,
      mensage,
      productsObjBtn,
      mensage2,
    } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              categ={ categories }
              onInputChange={ this.onInputChange }
              onBtnClick={ this.searchProducts }
              inputPesquisa={ inputPesquisa }
              productsObjInput={ productsObjInput }
              mensage={ mensage }
              onClickCatBtn={ this.catBtn }
              productsObjBtn={ productsObjBtn }
              mensage2={ mensage2 }
            />) }
          />
          <Route path="/cart" component={ Cart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
