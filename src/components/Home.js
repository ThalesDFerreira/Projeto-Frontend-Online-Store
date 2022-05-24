import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="pesquisa">
          <input id="pesquisa" type="text" placeholder="Pesquisa" />
        </label>
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
