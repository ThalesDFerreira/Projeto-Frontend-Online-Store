import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    const {
      categ,
      inputPesquisa,
      onInputChange,
      onBtnClick,
      productsObjInput,
      mensage,
      onClickCatBtn,
      productsObjBtn,
      mensage2,
      addCartList,
    } = this.props;

    return (
      <div>
        <div>
          <nav>
            <Link data-testid="shopping-cart-button" to="/cart">
              Carrinho
            </Link>
          </nav>
        </div>
        <div>
          <label htmlFor="pesquisa">
            <input
              data-testid="query-input"
              id="pesquisa"
              type="text"
              value={ inputPesquisa }
              name="inputPesquisa"
              onChange={ onInputChange }
            />
          </label>
          <button
            type="button"
            name="btnSearch"
            data-testid="query-button"
            onClick={ onBtnClick }
          >
            Busca
          </button>
        </div>
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <div>
          <ul>
            {categ.map((el) => (
              <button
                key={ el.id }
                data-testid="category"
                id={ el.id }
                type="button"
                onClick={ onClickCatBtn }
              >
                { el.name }
              </button>
            ))}
          </ul>
          <div>
            {
              productsObjInput.length > 0
                ? productsObjInput.map((el) => (
                  <div key={ el.id } data-testid="product">
                    <img src={ el.thumbnail } alt={ el.title } />
                    <p>{ el.title }</p>
                    <p>{ `R$ ${el.price}` }</p>
                  </div>
                ))
                : <h4>{ mensage }</h4>
            }
          </div>
          <div>
            {
              productsObjBtn.length > 0
                ? productsObjBtn.map((element) => (
                  <div key={ element.id } data-testid="product">
                    <img src={ element.thumbnail } alt={ element.title } />
                    <p>{ element.title }</p>
                    <p>{ `R$ ${element.price}` }</p>
                    <Link
                      data-testid="product-detail-link"
                      to={ `/${element.id}` }
                    >
                      Detalhes do Produto

                    </Link>
                    <button
                      type="button"
                      data-testid="product-add-to-cart"
                      value={ JSON.stringify(element) }
                      onClick={ addCartList }
                    >
                      Adicionar ao Carrinho

                    </button>
                  </div>
                ))
                : <h4>{ mensage2 }</h4>
            }
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  categ: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  inputPesquisa: PropTypes.string.isRequired,
  productsObjInput: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  mensage: PropTypes.string.isRequired,
  onClickCatBtn: PropTypes.func.isRequired,
  productsObjBtn: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  mensage2: PropTypes.string.isRequired,
  addCartList: PropTypes.func.isRequired,
};

export default Home;
