import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import DetailsProduct from './components/DetailsProduct';
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
    productList: [],
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

  addCartList = ({ target }) => {
    const { value } = target;
    const list = JSON.parse(value);
    const { productList } = this.state;
    productList.push(list);
    localStorage.setItem('cart', JSON.stringify(productList));
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
              addCartList={ this.addCartList }
            />) }
          />
          <Route path="/cart" component={ Cart } />
          <Route
            path="/:id"
            render={ (props) => (<DetailsProduct
              { ... props }
              addCartList={ this.addCartList }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
