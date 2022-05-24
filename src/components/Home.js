import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
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
      </div>
    );
  }
}

export default Home;
