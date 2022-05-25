import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../services/api';

class DetailsProduct extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ details: [] });

    const result = await getProductDetails(id);
    this.setState({ details: [result] });
  };

  render() {
    const { details } = this.state;
    const { addCartList } = this.props;
    return (
      <div>
        <nav>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        </nav>
        <div>
          {details.map((el) => (
            <div key={ el.id }>
              <p data-testid="product-detail-name">
                { el.title }
                {' '}
                -R$:
                {' '}
                { el.price }
              </p>
              <img src={ el.thumbnail } alt={ el.title } />
              <h3>Especifichções Técnicas</h3>
              <ul>
                {el.attributes.map((element) => (
                  <li key={ element.id }>
                    { element.name }
                    {' '}
                    -
                    {' '}
                    { element.value_name }
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                value={ JSON.stringify(el) }
                onClick={ addCartList }
              >
                Adicionar ao Carrinho

              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addCartList: PropTypes.func.isRequired,
};

export default DetailsProduct;
