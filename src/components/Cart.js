import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();

    this.state = {
      cart: [],
      total: 0,
    };
  }

  componentDidMount() {
    this.fetchCart();
  }

  cartManipulation = (array) => {
    const resultado = array.reduce((acc, crr) => {
      if (!acc[`produto${crr.id}`]) {
        acc[`produto${crr.id}`] = {
          descricao: crr,
          quantidade: 1,
        };
      } else {
        acc[`produto${crr.id}`] = {
          descricao: crr,
          quantidade: acc[`produto${crr.id}`].quantidade + 1,
        };
      }
      return acc;
    }, {});
    const cart = Object.values(resultado);
    cart.map((el) => this.setState((prev) => ({
      cart: [...prev.cart, el.descricao],
      [el.descricao.id]: el.quantidade,
      total: prev.total + el.descricao.price * el.quantidade,
    })));
  }

  fetchCart = () => {
    const cartItens = JSON.parse(localStorage.getItem('cart'));
    if (cartItens !== null) {
      this.cartManipulation(cartItens);
    }
  }

  addQuant = ({ target }) => {
    const { name, value } = target;
    this.setState((previ) => ({
      [name]: previ[name] + 1,
      total: previ.total + Number(value),
    }));
  }

  removQuant = ({ target }) => {
    const { value, name } = target;
    const { state } = this;
    this.setState((previe) => ({
      [name]: previe[name] - 1,
      total: previe.total - Number(value),
    }), () => {
      if (state[`${name}`] === 1) {
        this.setState((previe) => ({
          [name]: 1,
          total: previe.total + Number(value),
        }));
      }
    });
  }

  render() {
    const { cart, total } = this.state;
    const { state } = this;

    return (
      <div>
        <div>
          {state.cart.length > 0
            ? cart.map((value) => (
              <div key={ value.id }>
                <p data-testid="shopping-cart-product-name">{ value.title }</p>
                <img src={ value.thumbnail } alt={ value.title } />
                <p>{ `R$: ${value.price * state[`${value.id}`]}` }</p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  name={ value.id }
                  value={ value.price }
                  onClick={ this.removQuant }
                >
                  Diminuir
                </button>
                <p data-testid="shopping-cart-product-quantity">
                  {state[`${value.id}`]}
                </p>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  name={ value.id }
                  value={ value.price }
                  onClick={ this.addQuant }
                >
                  Aumentar
                </button>
              </div>))
            : <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>}
        </div>
        <h2>{ `Total: R$${total}` }</h2>
      </div>
    );
  }
}

export default ShoppingCart;
