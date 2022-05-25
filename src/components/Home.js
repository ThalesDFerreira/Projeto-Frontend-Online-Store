import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    const {
      categ,
      inputPesquisa,
      onChange,
      onClick,
      productsObj,
      mensage,
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
              onChange={ onChange }
            />
          </label>
          <button
            type="button"
            name="btnSearch"
            data-testid="query-button"
            onClick={ onClick }
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
              >
                { el.name }
              </button>
            ))}
          </ul>
          <div>
            {
              productsObj.length > 0
                ? productsObj.map((el) => (
                  <div key={ el.id } data-testid="product">
                    <img src={ el.thumbnail } alt={ el.title } />
                    <p>{ el.title }</p>
                    <p>{ `R$ ${el.price}` }</p>
                  </div>
                ))
                : <h4>{ mensage }</h4>
            }
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  categ: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  inputPesquisa: PropTypes.string.isRequired,
  productsObj: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  mensage: PropTypes.string.isRequired,
};

export default Home;
