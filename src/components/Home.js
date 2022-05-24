import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    const { categ } = this.props;

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
            <input id="pesquisa" type="text" placeholder="Pesquisa" />
          </label>
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
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  categ: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Home;
